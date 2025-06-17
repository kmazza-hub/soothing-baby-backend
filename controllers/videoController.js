// controllers/videoController.js
const FavoriteVideo = require("../models/FavoriteVideo");

exports.getVideos = async (req, res) => {
  try {
    const videos = await FavoriteVideo.find({ user: req.userId }).sort({ addedAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

exports.addVideo = async (req, res) => {
  const { title, videoUrl, tag } = req.body; // ✅ Grab tag
  try {
    const newVideo = new FavoriteVideo({
      title,
      videoUrl,
      tag: tag || "Untagged", // ✅ Save tag
      user: req.userId,
      addedAt: new Date(),
    });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ error: "Failed to delete video" });
  }
};
