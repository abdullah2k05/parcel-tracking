const courierMatchers = [
  { name: 'DHL', regex: /^\d{10}$/ },
  { name: 'TCS', regex: /^(TCS)?\d{10,12}$/i },
  { name: 'LEOPARDS', regex: /^(LP|LEOPARDS)[A-Z0-9]{8,18}$/i }
];

function detectCourier(trackingId) {
  const cleanId = String(trackingId || '').trim().toUpperCase();
  if (!cleanId) return null;

  const match = courierMatchers.find((item) => item.regex.test(cleanId));
  return match ? match.name : null;
}

module.exports = detectCourier;
