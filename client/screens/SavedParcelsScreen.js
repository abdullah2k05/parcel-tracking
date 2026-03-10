import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchSavedParcels } from '../services/api';
import { formatDate } from '../utils/helpers';

export default function SavedParcelsScreen() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadSaved() {
      try {
        const data = await fetchSavedParcels();
        if (mounted) {
          setItems(data.items || []);
        }
      } catch (apiError) {
        if (mounted) {
          setError(apiError.message || 'Failed to load saved parcels.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSaved();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1B6CA8" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.trackingId}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<Text style={styles.empty}>No saved parcels yet.</Text>}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.courier} - {item.trackingId}</Text>
          <Text style={styles.meta}>Status: {item.status}</Text>
          <Text style={styles.meta}>Location: {item.location || 'N/A'}</Text>
          <Text style={styles.meta}>Updated: {formatDate(item.updatedAt)}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 14,
    backgroundColor: '#F3F6FA',
    flexGrow: 1
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10
  },
  title: {
    fontWeight: '800',
    color: '#0D1B2A'
  },
  meta: {
    color: '#475569',
    marginTop: 4
  },
  empty: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 50
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    color: '#B91C1C',
    fontWeight: '700'
  }
});
