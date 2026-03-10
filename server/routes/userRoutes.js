const express = require('express');
const { registerUser, getUserSavedParcels } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.get('/:userId/saved', getUserSavedParcels);

module.exports = router;
