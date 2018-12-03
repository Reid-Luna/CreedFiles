const mongoose = require("mongoose");

const SeasonModel = new mongoose.Schema({
  season: {
    type: Number,
    required: true
  },
  episodes: [
    {
      season: {
        type: Number,
        required: true
      },
      number: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: false
      }
    }
  ]
});

module.exports = mongoose.model("seasons", SeasonModel);
