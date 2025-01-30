const express = require("express");
const User = require("../models/user");
const Quiz = require("../models/quiz");
const { authenticateToken, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin can fetch all users
router.get("/users", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Admin can delete a user
router.delete("/user/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Admin can fetch all quizzes
router.get("/quizzes", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Admin can add a quiz question
router.post("/quiz", authenticateToken, authorizeAdmin, async (req, res) => {
  const { question, options, correctAnswer } = req.body;
  try {
    if (!question || !options || !correctAnswer) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new quiz
    const newQuiz = new Quiz({ question, options, correctAnswer });
    await newQuiz.save();

    res.status(201).json({ message: "Question added successfully", quiz: newQuiz });
  } catch (error) {
    console.error("Error while saving quiz:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Admin can update a quiz question
router.put("/quiz/:id", authenticateToken, authorizeAdmin, async (req, res) => {
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
    res.status(200).json({ message: "Quiz updated successfully", quiz: updatedQuiz });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Admin can delete a quiz question
router.delete("/quiz/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
