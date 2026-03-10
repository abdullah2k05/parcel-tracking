const mongoose = require('mongoose');

const trackingHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    location: { type: String, default: '' },
    timestamp: { type: Date, required: true },
    note: { type: String, default: '' }
  },
  { _id: false }
);

const parcelSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, unique: true, index: true },
    courier: { type: String, required: true, index: true },
    status: { type: String, required: true },
    location: { type: String, default: '' },
    expectedDelivery: { type: Date, default: null },
    history: { type: [trackingHistorySchema], default: [] },
    savedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastSyncedAt: { type: Date, default: Date.now },
    rawPayload: { type: mongoose.Schema.Types.Mixed, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Parcel', parcelSchema);
