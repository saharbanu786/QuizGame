const express = require("express");
const Quiz = require("../models/quiz");
const { authenticateToken, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a quiz question (Admin only)
router.post("/", authenticateToken, authorizeAdmin, async (req, res) => {
  const { question, options, correctAnswer } = req.body;
  try {
    if (!question || !options || !correctAnswer) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newQuiz = new Quiz({ question, options, correctAnswer });
    await newQuiz.save();
    res.status(201).json({ message: "Quiz added successfully", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Read all quiz questions (Any authenticated user)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a quiz question (Admin only)
router.put("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  const { question, options, correctAnswer } = req.body;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { question, options, correctAnswer },
      { new: true }
    );
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz updated", quiz: updatedQuiz });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a quiz question (Admin only)
router.delete("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
