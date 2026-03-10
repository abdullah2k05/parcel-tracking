require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const startTrackingRefreshJob = require('./jobs/trackingUpdateJob');

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    if (process.env.ENABLE_TRACKING_CRON === 'true') {
      startTrackingRefreshJob();
    }
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
