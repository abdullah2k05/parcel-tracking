import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDate, statusColor } from '../utils/helpers';

export default function TrackingCard({ tracking }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{tracking.courier} - {tracking.trackingId}</Text>
      <Text style={[styles.status, { color: statusColor(tracking.status) }]}>{tracking.status}</Text>
      <Text style={styles.meta}>Current Location: {tracking.location || 'N/A'}</Text>
      <Text style={styles.meta}>Expected Delivery: {formatDate(tracking.expectedDelivery)}</Text>

      <View style={styles.divider} />
      <Text style={styles.subtitle}>History</Text>
      {tracking.history?.length ? (
        tracking.history.map((entry, index) => (
          <View style={styles.historyRow} key={`${entry.timestamp}-${index}`}>
            <Text style={styles.historyStatus}>{entry.status}</Text>
            <Text style={styles.historyMeta}>{entry.location || 'Unknown location'}</Text>
            <Text style={styles.historyMeta}>{formatDate(entry.timestamp)}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.historyMeta}>No shipment events available yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D1B2A'
  },
  status: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800'
  },
  meta: {
    marginTop: 6,
    color: '#334155'
  },
  divider: {
    marginVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0'
  },
  subtitle: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#0F172A'
  },
  historyRow: {
    borderLeftWidth: 2,
    borderLeftColor: '#1B6CA8',
    paddingLeft: 10,
    marginBottom: 10
  },
  historyStatus: {
    fontWeight: '700',
    color: '#111827'
  },
  historyMeta: {
    color: '#4B5563',
    fontSize: 12
  }
});
