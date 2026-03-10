const Parcel = require('../models/Parcel');
const detectCourier = require('../utils/detectCourier');
const courierServiceFactory = require('./courierServiceFactory');

async function saveTrackingResult(result, userId) {
  const parcel = await Parcel.findOneAndUpdate(
    { trackingId: result.trackingId },
    {
      $set: {
        courier: result.courier,
        status: result.status,
        location: result.location,
        expectedDelivery: result.expectedDelivery,
        history: result.history,
        lastSyncedAt: new Date(),
        rawPayload: result
      },
      ...(userId ? { $addToSet: { savedByUsers: userId } } : {})
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return parcel;
}

async function trackParcel({ trackingId, courier, save = true, userId }) {
  const selectedCourier = courier || detectCourier(trackingId) || 'UNKNOWN';
  const service = courierServiceFactory(selectedCourier);
  const result = await service.track({ trackingId, courier: selectedCourier });

  if (save) {
    await saveTrackingResult(result, userId);
  }

  return result;
}

module.exports = {
  trackParcel,
  saveTrackingResult
};
