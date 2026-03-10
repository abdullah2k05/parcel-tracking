function normalizeTrackingResponse(data) {
  const history = Array.isArray(data.history) ? data.history : [];

  return {
    courier: data.courier || 'UNKNOWN',
    trackingId: String(data.trackingId || ''),
    status: data.status || 'UNKNOWN',
    location: data.location || '',
    history: history.map((entry) => ({
      status: entry.status || 'UNKNOWN',
      location: entry.location || '',
      timestamp: entry.timestamp ? new Date(entry.timestamp).toISOString() : new Date().toISOString(),
      note: entry.note || ''
    })),
    expectedDelivery: data.expectedDelivery ? new Date(data.expectedDelivery).toISOString() : null
  };
}

module.exports = normalizeTrackingResponse;
