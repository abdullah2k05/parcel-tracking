const axios = require('axios');

async function fetchHtml(url) {
  const { data } = await axios.get(url, {
    timeout: 12000,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    }
  });

  return data;
}

module.exports = {
  fetchHtml
};
