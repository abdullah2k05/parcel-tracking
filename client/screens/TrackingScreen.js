import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, Alert, ScrollView } from 'react-native';
import TrackingCard from '../components/TrackingCard';
import { saveParcel, trackParcel } from '../services/api';

export default function TrackingScreen({ route }) {
  const { trackingId } = route.params;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [tracking, setTracking] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadTracking() {
      try {
        setError('');
        const data = await trackParcel(trackingId);
        if (mounted) {
          setTracking(data);
        }
      } catch (apiError) {
        if (mounted) {
          setError(apiError.message || 'Failed to fetch tracking details.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadTracking();
    return () => {
      mounted = false;
    };
  }, [trackingId]);

  const handleSave = async () => {
    if (!tracking) return;

    try {
      setSaving(true);
      await saveParcel(tracking.trackingId);
      Alert.alert('Saved', 'Parcel was saved to your account history.');
    } catch (apiError) {
      Alert.alert('Save failed', apiError.message || 'Could not save parcel.');
    } finally {
      setSaving(false);
    }
  };

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
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {tracking ? <TrackingCard tracking={tracking} /> : null}
      <Pressable style={styles.saveButton} onPress={handleSave} disabled={saving}>
        <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save Parcel'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    color: '#B91C1C',
    fontWeight: '700'
  },
  saveButton: {
    marginTop: 14,
    backgroundColor: '#0D1B2A',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700'
  }
});
