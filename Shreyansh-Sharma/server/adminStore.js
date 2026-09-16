const fs = require('fs');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const { authFile } = require('./config');

const readAuthFile = () => {
  try {
    return JSON.parse(fs.readFileSync(authFile, 'utf8'));
  } catch (_) {
    return null;
  }
};

const writeAuthFile = (admin) => {
  fs.writeFileSync(authFile, JSON.stringify(admin, null, 2));
};

const envAdmin = () => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return null;
  return { username, passwordHash: password };
};

async function getAdmin() {
  if (mongoose.connection.readyState === 1) {
    let doc = await Admin.findOne({ key: 'admin' }).lean();
    if (doc) return { username: doc.username, passwordHash: doc.passwordHash };

    const fromEnv = envAdmin();
    if (fromEnv) {
      const passwordHash = fromEnv.passwordHash.startsWith('$2')
        ? fromEnv.passwordHash
        : await bcrypt.hash(fromEnv.passwordHash, 10);
      doc = (await Admin.create({ key: 'admin', username: fromEnv.username, passwordHash })).toObject();
      return { username: doc.username, passwordHash: doc.passwordHash };
    }
  }

  const fromFile = readAuthFile();
  if (fromFile?.username) return fromFile;

  const fromEnv = envAdmin();
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Set ADMIN_USERNAME and ADMIN_PASSWORD in environment variables');
  }

  return { username: 'admin', passwordHash: 'portfolio2026' };
}

async function setAdminPassword(username, passwordHash) {
  if (mongoose.connection.readyState === 1) {
    await Admin.findOneAndUpdate(
      { key: 'admin' },
      { username, passwordHash },
      { upsert: true, new: true }
    );
    return;
  }
  writeAuthFile({ username, passwordHash });
}

module.exports = { getAdmin, setAdminPassword };
