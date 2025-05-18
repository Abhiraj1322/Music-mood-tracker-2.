const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  playlistId: {
    type: String,
 
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  },
  playlistUrl: {
    type: String
  },
  tracksTotal: {
    type: Number
  }
});

const LikedPlaylist = mongoose.model('LikedPlaylist', playlistSchema);
module.exports = LikedPlaylist;
