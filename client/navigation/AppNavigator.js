import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TrackingScreen from '../screens/TrackingScreen';
import SavedParcelsScreen from '../screens/SavedParcelsScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#0D1B2A' },
          headerTintColor: '#FFFFFF',
          contentStyle: { backgroundColor: '#F3F6FA' }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Parcel Tracker PK' }} />
        <Stack.Screen name="TrackingResult" component={TrackingScreen} options={{ title: 'Tracking Result' }} />
        <Stack.Screen name="SavedParcels" component={SavedParcelsScreen} options={{ title: 'Saved Parcels' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Tracking History' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
