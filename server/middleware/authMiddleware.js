const mongoose = require('mongoose');

function authMiddleware(req, res, next) {
  const userId = req.header('x-user-id');
  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    req.userId = userId;
  }
  next();
}

module.exports = authMiddleware;
