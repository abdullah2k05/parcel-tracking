const cheerio = require('cheerio');
const { fetchHtml } = require('../scrapingService');

async function scrapeDhl(trackingId) {
  const url = `https://www.dhl.com/pk-en/home/tracking/tracking-express.html?submit=1&tracking-id=${trackingId}`;
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const status = $('[data-testid="status-label"]').first().text().trim() || 'In Transit';
  const location = $('[data-testid="shipment-location"]').first().text().trim() || 'Pakistan Hub';

  return {
    status,
    location,
    history: [
      {
        status,
        location,
        timestamp: new Date().toISOString(),
        note: 'Fetched via DHL scrape fallback.'
      }
    ]
  };
}

module.exports = scrapeDhl;
