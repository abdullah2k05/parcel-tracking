const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    notificationPreferences: {
      pushEnabled: { type: Boolean, default: false },
      statusChanges: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

userSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = crypto.createHash('sha256').update(password).digest('hex');
};

userSchema.methods.comparePassword = function comparePassword(password) {
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  return hash === this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);
