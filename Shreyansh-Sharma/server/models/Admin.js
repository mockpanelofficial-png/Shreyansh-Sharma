const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    key: { type: String, default: 'admin', unique: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Admin || mongoose.model('Admin', schema);
