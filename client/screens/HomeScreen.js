import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import SearchBar from '../components/SearchBar';

export default function HomeScreen({ navigation }) {
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    const clean = trackingId.trim();
    if (clean.length < 5) {
      Alert.alert('Invalid Tracking ID', 'Please enter a valid tracking number.');
      return;
    }

    setLoading(true);
    navigation.navigate('TrackingResult', { trackingId: clean });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Track all parcels in one place</Text>
      <Text style={styles.subheading}>Supports DHL, TCS, Leopards Courier, and more.</Text>

      <SearchBar
        value={trackingId}
        onChangeText={setTrackingId}
        onSubmit={handleSearch}
        loading={loading}
      />

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('SavedParcels')}>
        <Text style={styles.secondaryButtonText}>Saved Parcels</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('History')}>
        <Text style={styles.secondaryButtonText}>Tracking History</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#F3F6FA'
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0D1B2A',
    marginBottom: 8
  },
  subheading: {
    color: '#334155',
    marginBottom: 20
  },
  secondaryButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#1B6CA8',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  secondaryButtonText: {
    color: '#1B6CA8',
    fontWeight: '700'
  }
});
