const cheerio = require('cheerio');
const { fetchHtml } = require('../scrapingService');

async function scrapeLeopards(trackingId) {
  const url = `https://www.leopardscourier.com/tracking?cn=${trackingId}`;
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const status = $('.shipment-status, .status').first().text().trim() || 'In Transit';
  const location = $('.shipment-location, .location').first().text().trim() || 'Lahore';

  return {
    status,
    location,
    history: [
      {
        status,
        location,
        timestamp: new Date().toISOString(),
        note: 'Fetched via Leopards scrape fallback.'
      }
    ]
  };
}

module.exports = scrapeLeopards;
