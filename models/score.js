const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model("Score", scoreSchema);
