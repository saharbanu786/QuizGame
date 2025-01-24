const express = require("express");
const router = express.Router();

// Import functions from quizCon.js using the correct path
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/quizController");  // Adjusted the path to correctly point to the controllers directory

// Create a new question
router.post("/", createQuestion);

// Get all questions
router.get("/", getAllQuestions);

// Get a question by ID
router.get("/:id", getQuestionById);

// Update a question
router.put("/:id", updateQuestion);

// Delete a question
router.delete("/:id", deleteQuestion);

module.exports = router;
