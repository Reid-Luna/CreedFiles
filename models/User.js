const mongoose = require("mongoose");

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
    type: [
      {
        episodeId: {
          type: mongoose.Types.ObjectId,
          required: true
        }
      }
    ]
  },
  dislikedEpisodes: {
    type: [
      {
        episodeId: {
          type: mongoose.Types.ObjectId,
          required: true
        }
      }
    ]
  },
  totalSorted: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("users", UserModel);
