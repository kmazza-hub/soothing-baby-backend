const express = require('express');
const router = express.Router();

console.log("✅ routes/index.js is loaded");

const authRoutes = require('./authRoutes');
const videoRoutes = require('./videoRoutes');
const soothingImageRoutes = require('./soothingImageRoutes'); // ✅ Rename for clarity

router.use('/auth', authRoutes);
router.use('/videos', videoRoutes);
router.use('/images', soothingImageRoutes); // ✅ Only use one image route

module.exports = router;
