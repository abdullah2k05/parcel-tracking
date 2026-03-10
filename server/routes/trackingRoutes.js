const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  trackShipment,
  getTrackingHistory,
  getSavedParcels
} = require('../controllers/trackingController');

const router = express.Router();

router.post('/', authMiddleware, trackShipment);
router.get('/history', authMiddleware, getTrackingHistory);
router.get('/saved', authMiddleware, getSavedParcels);

module.exports = router;
