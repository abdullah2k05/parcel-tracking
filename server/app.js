const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const trackingRoutes = require('./routes/trackingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'parcel-tracker-api' });
});

app.use('/api/track', trackingRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal server error.'
  });
});

module.exports = app;
