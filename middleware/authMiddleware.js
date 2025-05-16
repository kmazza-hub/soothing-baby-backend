// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Reject if no Authorization header
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // attach user ID to request
    next(); // proceed to the next middleware/controller
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

