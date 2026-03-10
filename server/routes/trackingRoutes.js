const router = require('express').Router();
const Parcel = require('../models/Parcel');
const User = require('../models/User');

// Route to track a parcel by ID
router.get('/track', async (req, res) => {
  try {
    const trackingId = req.body.trackingId;
    const parcel = await Parcel.findById(trackingId);   
    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }
    res.json(parcel);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;        