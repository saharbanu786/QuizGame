const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

module.exports = mongoose.model("Question", questionSchema);
