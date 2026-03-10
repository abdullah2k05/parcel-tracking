const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const parcelSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  weight: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Parcel = mongoose.model('Parcel', parcelSchema);

module.exports = Parcel;        