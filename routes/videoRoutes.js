// ✅ routes/videoRoutes.js
const express = require("express");
const router = express.Router();
const {
  getVideos,
  addVideo,
  deleteVideo,
} = require("../controllers/videoController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, getVideos);
router.post("/", auth, addVideo);
router.delete("/:id", auth, deleteVideo);

module.exports = router;

// ✅ controllers/videoController.js
const FavoriteVideo = require("../models/FavoriteVideo");

exports.getVideos = async (req, res) => {
  try {
    const videos = await FavoriteVideo.find({ user: req.userId }).sort({ addedAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error("❌ Failed to fetch videos:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

exports.addVideo = async (req, res) => {
  const { title, videoUrl, tag } = req.body;
  try {
    const newVideo = new FavoriteVideo({
      title: title || "Video",
      videoUrl,
      tag: tag?.trim() || "Untagged",
      user: req.userId,
      addedAt: new Date(),
    });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    console.error("❌ Failed to save video:", err);
    res.status(400).json({ error: "Failed to save video" });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await FavoriteVideo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!video) {
      return res.status(404).json({ error: "Video not found or unauthorized" });
    }
    res.json({ message: "Video deleted" });
  } catch (err) {
    console.error("❌ Failed to delete video:", err);
    res.status(500).json({ error: "Failed to delete video" });
  }
};

// ✅ models/FavoriteVideo.js
const mongoose = require("mongoose");

const favoriteVideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  tag: { type: String, default: "Untagged" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FavoriteVideo", favoriteVideoSchema);

