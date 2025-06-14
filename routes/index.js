const express = require('express');
const router = express.Router();

console.log("✅ routes/index.js is loaded");

const authRoutes = require('./authRoutes');
const imageRoutes = require('./imageRoutes');
const videoRoutes = require('./videoRoutes');

router.use('/auth', authRoutes);
router.use('/images', imageRoutes);
router.use('/videos', videoRoutes);

module.exports = router;
