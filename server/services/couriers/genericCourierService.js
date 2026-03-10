const normalizeTrackingResponse = require('../../utils/normalizeTracking');

async function track({ trackingId, courier }) {
  return normalizeTrackingResponse({
    courier: courier || 'UNKNOWN',
    trackingId,
    status: 'UNKNOWN',
    location: '',
    history: [
      {
        status: 'UNKNOWN',
        location: '',
        timestamp: new Date().toISOString(),
        note: 'Courier auto-detection failed. Manual confirmation required.'
      }
    ],
    expectedDelivery: null
  });
}

module.exports = { track };
