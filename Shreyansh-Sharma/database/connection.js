const mongoose = require('mongoose');

async function connectDatabase(uri) {
  if (!uri) throw new Error('MONGODB_URI is not configured');
  return mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
}

module.exports = { connectDatabase };
