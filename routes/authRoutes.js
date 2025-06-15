const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

console.log("✅ authRoutes.js is loaded");

router.post('/register', register);
router.post('/login', login);
router.get('/ping', (req, res) => {
  res.json({ message: 'Auth route is alive' });
});

module.exports = router;
