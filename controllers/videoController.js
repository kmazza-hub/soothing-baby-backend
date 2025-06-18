const FavoriteVideo = require("../models/FavoriteVideo");

// ✅ GET all videos for the logged-in user
exports.getVideos = async (req, res) => {
  try {
    const videos = await FavoriteVideo.find({ user: req.userId }).sort({ sortOrder: 1 });
    res.json(videos);
  } catch (err) {
    console.error("❌ Failed to fetch videos:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// ✅ POST a new video with tag support and sortOrder
exports.addVideo = async (req, res) => {
  const { title, videoUrl, tag } = req.body;
  try {
    // Determine the next sortOrder value
    const lastVideo = await FavoriteVideo.findOne({ user: req.userId }).sort({ sortOrder: -1 });
    const nextSortOrder = lastVideo ? lastVideo.sortOrder + 1 : 0;

    const newVideo = new FavoriteVideo({
      title,
      videoUrl,
      tag: tag?.trim() || "Untagged",
      user: req.userId,
      addedAt: new Date(),
      sortOrder: nextSortOrder,
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

// ✅ PUT /videos/reorder: Update sortOrder of multiple videos
exports.updateVideoOrder = async (req, res) => {
  const { reorderedVideos } = req.body;

  if (!Array.isArray(reorderedVideos)) {
    return res.status(400).json({ error: "Invalid input format" });
  }

  try {
    // Update each video's sortOrder using bulkWrite
    const bulkOps = reorderedVideos.map((video, index) => ({
      updateOne: {
        filter: { _id: video.id, user: req.userId },
        update: { sortOrder: index },
      },
    }));

    await FavoriteVideo.bulkWrite(bulkOps);

    res.status(200).json({ message: "Video order updated successfully" });
  } catch (err) {
    console.error("❌ Failed to update video order:", err);
    res.status(500).json({ error: "Failed to update video order" });
  }
};
