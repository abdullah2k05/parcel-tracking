const cron = require('node-cron');
const Parcel = require('../models/Parcel');
const { trackParcel } = require('../services/courierService');

function startTrackingRefreshJob() {
  cron.schedule('*/30 * * * *', async () => {
    try {
      const candidates = await Parcel.find({
        status: { $nin: ['DELIVERED', 'Delivered', 'delivered'] }
      })
        .sort({ updatedAt: 1 })
        .limit(50)
        .select('trackingId courier');

      await Promise.all(
        candidates.map((parcel) =>
          trackParcel({
            trackingId: parcel.trackingId,
            courier: parcel.courier,
            save: true
          }).catch(() => null)
        )
      );

      console.log(`[cron] refreshed ${candidates.length} parcels`);
    } catch (error) {
      console.error('[cron] refresh failed:', error.message);
    }
  });
}

module.exports = startTrackingRefreshJob;
