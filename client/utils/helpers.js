export function formatDate(value) {
  if (!value) return 'N/A';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';

  return date.toLocaleString();
}

export function statusColor(status) {
  const text = String(status || '').toLowerCase();

  if (text.includes('delivered')) return '#047857';
  if (text.includes('failed') || text.includes('exception')) return '#B91C1C';
  if (text.includes('transit') || text.includes('out for delivery')) return '#1D4ED8';
  return '#374151';
}
