const axios = require('axios');
const scrapeDhl = require('../scrapers/dhlScraper');
const normalizeTrackingResponse = require('../../utils/normalizeTracking');

async function track({ trackingId }) {
  try {
    if (!process.env.DHL_API_URL || !process.env.DHL_API_KEY) {
      throw new Error('DHL API credentials not configured');
    }

    const { data } = await axios.get(`${process.env.DHL_API_URL}/track/shipments`, {
      params: { trackingNumber: trackingId },
      headers: { 'DHL-API-Key': process.env.DHL_API_KEY }
    });

    const shipment = data?.shipments?.[0] || {};
    return normalizeTrackingResponse({
      courier: 'DHL',
      trackingId,
      status: shipment?.status?.statusCode || 'IN_TRANSIT',
      location: shipment?.events?.[0]?.location?.address?.addressLocality || '',
      history: (shipment?.events || []).map((event) => ({
        status: event.description || event.status,
        location: event?.location?.address?.addressLocality || '',
        timestamp: event.timestamp,
        note: ''
      })),
      expectedDelivery: shipment?.estimatedDeliveryDate
    });
  } catch (error) {
    const fallback = await scrapeDhl(trackingId);
    return normalizeTrackingResponse({ courier: 'DHL', trackingId, ...fallback });
  }
}

module.exports = { track };
