const mongoose = require('mongoose');

const personalImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('PersonalImage', personalImageSchema);
