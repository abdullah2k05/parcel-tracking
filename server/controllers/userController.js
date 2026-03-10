const User = require('../models/User');
const Parcel = require('../models/Parcel');

async function registerUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, and password are required.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const user = new User({ name, email: email.toLowerCase() });
    user.setPassword(password);
    await user.save();

    return res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    return next(error);
  }
}

async function getUserSavedParcels(req, res, next) {
  try {
    const userId = req.params.userId;

    const items = await Parcel.find({ savedByUsers: userId })
      .sort({ updatedAt: -1 })
      .limit(100)
      .select('trackingId courier status location expectedDelivery updatedAt');

    return res.json({ items });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  registerUser,
  getUserSavedParcels
};
