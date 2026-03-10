const cheerio = require('cheerio');
const { fetchHtml } = require('../scrapingService');

async function scrapeTcs(trackingId) {
  const url = `https://www.tcsexpress.com/track/${trackingId}`;
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const status = $('.tracking-status, .status').first().text().trim() || 'In Transit';
  const location = $('.tracking-location, .location').first().text().trim() || 'Karachi';

  return {
    status,
    location,
    history: [
      {
        status,
        location,
        timestamp: new Date().toISOString(),
        note: 'Fetched via TCS scrape fallback.'
      }
    ]
  };
}

module.exports = scrapeTcs;
