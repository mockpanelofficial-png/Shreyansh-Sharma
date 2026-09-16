const mongoose = require('mongoose');

async function connectDatabase(uri, databaseName = 'ShreyanshSharma') {
  if (!uri) throw new Error('MONGODB_URI is not configured');
  return mongoose.connect(uri, { dbName: databaseName, serverSelectionTimeoutMS: 10000 });
}

module.exports = { connectDatabase };
