const Parcel = require('../models/Parcel');
const { trackParcel } = require('../services/courierService');

async function trackShipment(req, res, next) {
  try {
    const { trackingId, courier, save = true } = req.body;

    if (!trackingId || String(trackingId).trim().length < 5) {
      return res.status(400).json({ message: 'Valid trackingId is required.' });
    }

    const result = await trackParcel({
      trackingId: String(trackingId).trim(),
      courier,
      save,
      userId: req.userId
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

async function getTrackingHistory(req, res, next) {
  try {
    const trackingId = req.query.trackingId;
    const query = trackingId ? { trackingId: String(trackingId).trim() } : {};

    const items = await Parcel.find(query)
      .sort({ updatedAt: -1 })
      .limit(50)
      .select('trackingId courier status location expectedDelivery history updatedAt');

    return res.json({ items });
  } catch (error) {
    return next(error);
  }
}

async function getSavedParcels(req, res, next) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'x-user-id header is required.' });
    }

    const items = await Parcel.find({ savedByUsers: req.userId })
      .sort({ updatedAt: -1 })
      .limit(100)
      .select('trackingId courier status location expectedDelivery updatedAt');

    return res.json({ items });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  trackShipment,
  getTrackingHistory,
  getSavedParcels
};
