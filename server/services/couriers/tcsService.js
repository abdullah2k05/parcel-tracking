const axios = require('axios');
const scrapeTcs = require('../scrapers/tcsScraper');
const normalizeTrackingResponse = require('../../utils/normalizeTracking');

async function track({ trackingId }) {
  try {
    if (!process.env.TCS_API_URL || !process.env.TCS_API_KEY) {
      throw new Error('TCS API credentials not configured');
    }

    const { data } = await axios.get(`${process.env.TCS_API_URL}/track`, {
      params: { consignmentNo: trackingId },
      headers: { Authorization: `Bearer ${process.env.TCS_API_KEY}` }
    });

    return normalizeTrackingResponse({
      courier: 'TCS',
      trackingId,
      status: data?.currentStatus,
      location: data?.currentLocation,
      history: (data?.events || []).map((event) => ({
        status: event.status,
        location: event.location,
        timestamp: event.time,
        note: event.remarks || ''
      })),
      expectedDelivery: data?.expectedDelivery
    });
  } catch (error) {
    const fallback = await scrapeTcs(trackingId);
    return normalizeTrackingResponse({ courier: 'TCS', trackingId, ...fallback });
  }
}

module.exports = { track };
