const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try {
    req.admin = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).json({ message: 'Admin authentication required' });
  }
};
