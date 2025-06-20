// controllers/videoController.js
const FavoriteVideo = require("../models/FavoriteVideo");

// ✅ GET all videos for the logged-in user
exports.getVideos = async (req, res) => {
  try {
    const videos = await FavoriteVideo.find({ user: req.userId }).sort({ addedAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error("❌ Failed to fetch videos:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// ✅ POST a new video with tag support
exports.addVideo = async (req, res) => {
  const { title, videoUrl, tag } = req.body;
  try {
    const newVideo = new FavoriteVideo({
      title,
      videoUrl,
      tag: tag?.trim() || "Untagged", // <-- Ensures "Untagged" is used if empty
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

// ✅ DELETE a video owned by the logged-in user
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
