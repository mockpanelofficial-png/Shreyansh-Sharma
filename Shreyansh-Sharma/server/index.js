require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('./middleware/auth');
const store = require('./store');
const { getAdmin, setAdminPassword } = require('./adminStore');
const { jwtSecret, useCloudinary, cloudinaryFolder, allowedOrigins } = require('./config');
const Message = require('./models/Message');

const messagesFile = path.join(__dirname, 'data', 'messages.json');
const readMessages = () => JSON.parse(fs.readFileSync(messagesFile, 'utf8') || '[]');
const writeMessages = (rows) => fs.writeFileSync(messagesFile, JSON.stringify(rows, null, 2));

let cloudinary;
if (useCloudinary) {
  cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const app = express();
const PORT = process.env.PORT || 5000;
const contactAttempts = new Map();
const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

app.set('trust proxy', 1);

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; font-src 'self' data:; frame-ancestors 'self'"
  );
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || !allowedOrigins?.length) return callback(null, true);
      const normalized = origin.replace(/\/$/, '');
      if (allowedOrigins.includes(normalized)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '4mb' }));

if (!useCloudinary) {
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  app.use('/uploads', express.static(uploadsDir));
}

app.get('/api/health', (req, res) =>
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? 'mongodb' : 'local-json',
    uploads: useCloudinary ? 'cloudinary' : 'local',
  })
);

app.get('/api/content', async (req, res, next) => {
  try {
    res.json(await store.get());
  } catch (e) {
    next(e);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const rec = loginAttempts.get(ip) || { count: 0, until: 0 };
    if (rec.until > now) {
      return res.status(429).json({
        message: `Too many failed attempts. Try again in ${Math.ceil((rec.until - now) / 60000)} minutes.`,
      });
    }

    const admin = await getAdmin();
    const hash = admin.passwordHash || '';
    const valid =
      req.body.username === admin.username &&
      (hash.startsWith('$2')
        ? await bcrypt.compare(String(req.body.password || ''), hash)
        : String(req.body.password || '') === hash);

    if (!valid) {
      rec.count++;
      if (rec.count >= MAX_LOGIN_ATTEMPTS) {
        rec.count = 0;
        rec.until = now + LOCK_MINUTES * 60000;
        loginAttempts.set(ip, rec);
        return res.status(429).json({ message: `Too many failed attempts. Account locked for ${LOCK_MINUTES} minutes.` });
      }
      loginAttempts.set(ip, rec);
      return res.status(401).json({ message: `Invalid credentials. ${MAX_LOGIN_ATTEMPTS - rec.count} attempts left.` });
    }

    loginAttempts.delete(ip);
    res.json({ token: jwt.sign({ role: 'admin', username: admin.username }, jwtSecret, { expiresIn: '8h' }) });
  } catch (e) {
    next(e);
  }
});

app.post('/api/auth/password', auth, async (req, res, next) => {
  try {
    const admin = await getAdmin();
    const hash = admin.passwordHash || '';
    const ok = hash.startsWith('$2')
      ? await bcrypt.compare(String(req.body.current || ''), hash)
      : String(req.body.current || '') === hash;
    if (!ok) return res.status(401).json({ message: 'Current password is incorrect' });

    const nextPw = String(req.body.next || '');
    if (nextPw.length < 8) return res.status(400).json({ message: 'New password must be at least 8 characters' });

    await setAdminPassword(admin.username, await bcrypt.hash(nextPw, 10));
    res.json({ ok: true, message: 'Password updated successfully' });
  } catch (e) {
    next(e);
  }
});

app.put('/api/content', auth, async (req, res, next) => {
  try {
    res.json(await store.set(req.body));
  } catch (e) {
    next(e);
  }
});

app.post('/api/contact', async (req, res, next) => {
  try {
    const now = Date.now();
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const recent = (contactAttempts.get(ip) || []).filter((t) => now - t < 3600000);
    if (recent.length >= 12) return res.status(429).json({ message: 'Too many messages. Please wait a while and try again.' });
    contactAttempts.set(ip, [...recent, now]);

    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim();
    const message = String(req.body.message || '').trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 5) {
      return res.status(400).json({ message: 'Please complete all fields with a valid email.' });
    }

    if (mongoose.connection.readyState === 1) {
      await Message.create({ name, email, message });
    } else {
      const rows = readMessages();
      rows.unshift({ _id: Date.now().toString(), name, email, message, read: false, createdAt: new Date().toISOString() });
      writeMessages(rows);
    }
    res.status(201).json({ ok: true, message: 'Thank you! Your message has been received.' });
  } catch (e) {
    next(e);
  }
});

app.get('/api/messages', auth, async (req, res, next) => {
  try {
    const rows =
      mongoose.connection.readyState === 1 ? await Message.find().sort({ createdAt: -1 }).lean() : readMessages();
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

app.delete('/api/messages/:id', auth, async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) await Message.findByIdAndDelete(req.params.id);
    else writeMessages(readMessages().filter((x) => String(x._id) !== String(req.params.id)));
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

const fileFilter = (req, file, cb) =>
  cb(null, /^(image\/|application\/pdf|application\/vnd.openxmlformats)/.test(file.mimetype));

const upload = multer({
  storage: useCloudinary ? multer.memoryStorage() : multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`),
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter,
});

function uploadBufferToCloudinary(buffer, originalname) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: cloudinaryFolder, resource_type: 'auto', public_id: `${Date.now()}-${originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}` },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });
}

app.post('/api/upload', auth, upload.array('files', 4), async (req, res, next) => {
  try {
    if (useCloudinary) {
      const uploaded = await Promise.all(
        req.files.map(async (f) => {
          const result = await uploadBufferToCloudinary(f.buffer, f.originalname);
          return { name: f.originalname, type: f.mimetype, url: result.secure_url, publicId: result.public_id };
        })
      );
      return res.json(uploaded);
    }
    res.json(req.files.map((f) => ({ name: f.originalname, type: f.mimetype, url: `/uploads/${f.filename}` })));
  } catch (e) {
    next(e);
  }
});

app.delete('/api/upload', auth, async (req, res, next) => {
  try {
    const id = String(req.query.id || '');
    if (!id) return res.status(400).json({ message: 'File id required' });
    if (useCloudinary) {
      await cloudinary.uploader.destroy(id, { resource_type: 'auto' });
    } else {
      const safe = path.basename(id);
      const p = path.join(__dirname, 'uploads', safe);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.get('/authwall', (req, res) => res.redirect('/'));
  app.use(express.static(clientDist));
  app.use((req, res, next) =>
    req.method === 'GET' && !req.path.startsWith('/api') ? res.sendFile(path.join(clientDist, 'index.html')) : next()
  );
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      store.setMongoReady(true);
      console.log('Connected to MongoDB');
    } catch (e) {
      console.warn('MongoDB unavailable; using local JSON fallback:', e.message);
    }
  }
  if (useCloudinary) console.log('File uploads: Cloudinary');
  else console.log('File uploads: local disk (set CLOUDINARY_* env vars for production)');

  const checks = [
    ['JWT_SECRET', Boolean(process.env.JWT_SECRET)],
    ['ADMIN_USERNAME', Boolean(process.env.ADMIN_USERNAME)],
    ['ADMIN_PASSWORD', Boolean(process.env.ADMIN_PASSWORD)],
    ['CLIENT_ORIGIN', Boolean(allowedOrigins?.length)],
    ['MONGODB_URI', mongoose.connection.readyState === 1],
    ['CLOUDINARY', useCloudinary],
  ];
  checks.forEach(([name, ok]) => console.log(`${ok ? '✓' : '⚠'} ${name}`));

  app.listen(PORT, '0.0.0.0', () => console.log(`API listening on ${PORT}`));
}

start();
