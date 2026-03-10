# Parcel Tracker App (Pakistan)

A production-oriented MERN + React Native architecture for tracking parcels from multiple courier providers in one app.

## 1. Architecture Overview

### Backend (Node.js + Express + MongoDB)
- `server/controllers`: request handling + response formatting
- `server/services`: business logic and courier integrations
- `server/services/couriers`: courier-specific adapters (`DHL`, `TCS`, `LEOPARDS`)
- `server/services/scrapers`: fallback scrapers using `axios + cheerio`
- `server/utils/detectCourier.js`: courier auto-detection by tracking format
- `server/services/courierServiceFactory.js`: factory for courier-specific services
- `server/models`: persistent entities (`User`, `Parcel`)
- `server/jobs/trackingUpdateJob.js`: optional periodic status refresh

### Frontend (React Native + Expo)
- `client/screens`: app screens
- `client/components`: reusable UI components
- `client/navigation`: React Navigation setup
- `client/services/api.js`: API client and request wrappers
- `client/utils/helpers.js`: presentation helpers

## 2. Normalized Tracking Contract

Every courier service returns:

```json
{
  "courier": "",
  "trackingId": "",
  "status": "",
  "location": "",
  "history": [],
  "expectedDelivery": ""
}
```

This keeps downstream API and UI consistent regardless of courier source.

## 3. API Design

### POST `/api/track`
Request:
```json
{
  "trackingId": "1234567890"
}
```

Response:
```json
{
  "courier": "DHL",
  "trackingId": "1234567890",
  "status": "IN_TRANSIT",
  "location": "Karachi",
  "history": [
    {
      "status": "Shipment picked up",
      "location": "Lahore",
      "timestamp": "2026-03-10T10:00:00.000Z",
      "note": ""
    }
  ],
  "expectedDelivery": "2026-03-12T00:00:00.000Z"
}
```

Other routes:
- `GET /api/track/history`
- `GET /api/track/saved`
- `POST /api/users/register`
- `GET /api/users/:userId/saved`

## 4. Courier Integration Strategy

1. Detect courier from pattern (`detectCourier`) when possible.
2. Resolve courier module using `courierServiceFactory`.
3. Try official API if credentials are configured.
4. If API unavailable/fails, use isolated scraper module.
5. Normalize payload and persist latest result in MongoDB.

## 5. Run Instructions

### Prerequisites
- Node.js 18+
- MongoDB instance
- Expo CLI (`npm i -g expo-cli`)

### Backend Setup
```bash
cd server
npm install
```

Create `.env` in `server/`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/parcel_tracker
ENABLE_TRACKING_CRON=true

# Optional courier API credentials
DHL_API_URL=
DHL_API_KEY=
TCS_API_URL=
TCS_API_KEY=
LEOPARDS_API_URL=
LEOPARDS_API_KEY=
```

Start backend:
```bash
npm run dev
```

### Mobile App Setup
```bash
cd client
npm install
npm run start
```

For Android emulator, API base URL is preconfigured as `http://10.0.2.2:5000/api`.

## 6. Extending with New Couriers

1. Add `server/services/couriers/newCourierService.js`
2. Add optional `server/services/scrapers/newCourierScraper.js`
3. Register module in `server/services/courierServiceFactory.js`
4. Add detection regex in `server/utils/detectCourier.js`

## 7. Production Notes

- Add Redis cache layer in `courierService` to avoid repeated upstream calls.
- Move background refresh to BullMQ workers for horizontal scaling.
- Add JWT auth + refresh tokens for real user sessions.
- Integrate FCM/Expo push notifications from tracking status changes.
