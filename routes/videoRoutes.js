// routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const {
  getVideos,
  addVideo,
  deleteVideo,
} = require('../controllers/videoController');
const auth = require('../middleware/authMiddleware');

// ✅ Get all favorite videos for the authenticated user
router.get('/', auth, getVideos);

// ✅ Add a new video for the authenticated user
router.post('/', auth, addVideo);

// ✅ Delete a video by ID for the authenticated user
router.delete('/:id', auth, deleteVideo);

module.exports = router;
