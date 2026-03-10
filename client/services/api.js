import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:5000/api';
const DEMO_USER_ID = '000000000000000000000001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    'x-user-id': DEMO_USER_ID
  }
});

function extractError(error) {
  return error?.response?.data?.message || error.message || 'Request failed';
}

export async function trackParcel(trackingId) {
  try {
    const { data } = await apiClient.post('/track', { trackingId, save: true });
    return data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

export async function fetchTrackingHistory() {
  try {
    const { data } = await apiClient.get('/track/history');
    return data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

export async function fetchSavedParcels() {
  try {
    const { data } = await apiClient.get('/track/saved');
    return data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

export async function saveParcel(trackingId) {
  try {
    const { data } = await apiClient.post('/track', { trackingId, save: true });
    return data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

export default apiClient;
