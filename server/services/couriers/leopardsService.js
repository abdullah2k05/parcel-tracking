const axios = require('axios');
const scrapeLeopards = require('../scrapers/leopardsScraper');
const normalizeTrackingResponse = require('../../utils/normalizeTracking');

async function track({ trackingId }) {
  try {
    if (!process.env.LEOPARDS_API_URL || !process.env.LEOPARDS_API_KEY) {
      throw new Error('Leopards API credentials not configured');
    }

    const { data } = await axios.get(`${process.env.LEOPARDS_API_URL}/track`, {
      params: { trackingId },
      headers: { 'x-api-key': process.env.LEOPARDS_API_KEY }
    });

    return normalizeTrackingResponse({
      courier: 'LEOPARDS',
      trackingId,
      status: data?.status,
      location: data?.location,
      history: (data?.history || []).map((event) => ({
        status: event.status,
        location: event.location,
        timestamp: event.timestamp,
        note: event.note || ''
      })),
      expectedDelivery: data?.expectedDelivery
    });
  } catch (error) {
    const fallback = await scrapeLeopards(trackingId);
    return normalizeTrackingResponse({ courier: 'LEOPARDS', trackingId, ...fallback });
  }
}

module.exports = { track };
