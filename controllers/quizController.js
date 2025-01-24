const Question = require("../models/quiz");
const { v4: uuidv4 } = require("uuid");

// Create a new question
const createQuestion = async (req, res) => {
  const { questionText, options, correctAnswer } = req.body;
  try {
    if (!questionText || !options || !correctAnswer) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const newQuestion = new Question({
      id: uuidv4(),
      questionText,
      options,
      correctAnswer,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single question by ID
const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({ id });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a question
const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { questionText, options, correctAnswer } = req.body;
  try {
    const updatedQuestion = await Question.findOneAndUpdate(
      { id },
      { questionText, options, correctAnswer },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await Question.findOneAndDelete({ id });
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
