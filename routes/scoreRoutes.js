const express = require("express");
const Score = require("../models/score");

const router = express.Router();

// Create a new score
router.post("/", async (req, res) => {
  const { userName, score } = req.body;

  // Input validation
  if (!userName || typeof score !== "number") {
    return res.status(400).json({ message: "Invalid input. Please provide a valid userName and score." });
  }

  try {
    const newScore = new Score({ userName, score });
    await newScore.save();
    res.status(201).json({ message: "Score submitted successfully", score: newScore });
  } catch (error) {
    console.error("Error creating score:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Read all scores
router.get("/", async (req, res) => {
  try {
    const scores = await Score.find();
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a score
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { userName, score } = req.body;

  // Input validation
  if (!userName || typeof score !== "number") {
    return res.status(400).json({ message: "Invalid input. Please provide a valid userName and score." });
  }

  try {
    const updatedScore = await Score.findByIdAndUpdate(
      id,
      { userName, score },
      { new: true, runValidators: true } // Run schema validators
    );

    if (!updatedScore) {
      return res.status(404).json({ message: "Score not found" });
    }

    res.status(200).json({ message: "Score updated successfully", score: updatedScore });
  } catch (error) {
    console.error("Error updating score:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a score
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedScore = await Score.findByIdAndDelete(id);

    if (!deletedScore) {
      return res.status(404).json({ message: "Score not found" });
    }

    res.status(200).json({ message: "Score deleted successfully" });
  } catch (error) {
    console.error("Error deleting score:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; 