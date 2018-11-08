const mongoose = require("mongoose");

const SeasonModel = new mongoose.Schema({
  season: {
    type: Number,
    required: true
  },
  episodes: [
    {
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
      }
    }
  ]
});

module.exports = mongoose.model("seasons", SeasonModel);
