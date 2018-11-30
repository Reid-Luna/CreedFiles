const mongoose = require("mongoose");

const episodeId = {
  type: String,
  required: true
};

const UserModel = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  likedEpisodes: {
    type: [episodeId]
  },
  dislikedEpisodes: {
    type: [episodeId]
  },
  totalSorted: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("users", UserModel);
