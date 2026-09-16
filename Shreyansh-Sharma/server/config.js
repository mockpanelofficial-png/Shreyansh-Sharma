const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const secretFile = path.join(__dirname, 'data', 'secret.env');

function resolveJwtSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  try {
    const line = fs.readFileSync(secretFile, 'utf8').trim();
    const match = line.match(/JWT_SECRET=(.*)/);
    if (match && match[1]) return match[1];
  } catch (_) {}
  const secret = crypto.randomBytes(32).toString('hex');
  try {
    fs.writeFileSync(secretFile, `JWT_SECRET=${secret}`);
  } catch (_) {}
  return secret;
}

function parseOrigins(value) {
  if (!value) return null;
  return value
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);
}

const allowedOrigins = parseOrigins(process.env.CLIENT_ORIGIN);

const useCloudinary = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

module.exports = {
  jwtSecret: resolveJwtSecret(),
  authFile: path.join(__dirname, 'data', 'auth.json'),
  allowedOrigins,
  databaseName: process.env.MONGODB_DB || 'ShreyanshSharma',
  useCloudinary,
  cloudinaryFolder: process.env.CLOUDINARY_FOLDER || 'shreyansh-portfolio',
};
