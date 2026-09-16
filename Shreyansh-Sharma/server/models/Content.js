const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'main', unique: true },
    site: { type: mongoose.Schema.Types.Mixed, default: {} },
    timeline: { type: [mongoose.Schema.Types.Mixed], default: [] },
    items: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Content || mongoose.model('Content', ContentSchema);
