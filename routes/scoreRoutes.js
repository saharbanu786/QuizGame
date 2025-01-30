// const express = require("express");
// const Score = require("../models/score");
// const User = require("../models/user"); // User model to check roles
// const jwt = require("jsonwebtoken");
// const router = express.Router();

// // Middleware to verify token and check if user is an admin
// const verifyAdmin = async (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     return res.status(401).json({ message: "Access denied, no token provided" });
//   }

//   try {
//     // Decode the token to get user info
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user || user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied, admin only" });
//     }

//     req.user = user; // Add user to request object
//     next(); // Continue to the next middleware or route handler
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return res.status(400).json({ message: "Invalid token" });
//   }
// };

// // Create a new score (admin only) - POST /api/score
// router.post("/", verifyAdmin, async (req, res) => {
//   const { userName, score } = req.body;

//   // Input validation
//   if (!userName || typeof score !== "number") {
//     return res.status(400).json({ message: "Invalid input. Please provide a valid userName and score." });
//   }

//   try {
//     const newScore = new Score({ userName, score });
//     await newScore.save();
//     res.status(201).json({ message: "Score submitted successfully", score: newScore });
//   } catch (error) {
//     console.error("Error saving score:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Edit a score (admin only) - PUT /api/score/:id
// router.put("/:id", verifyAdmin, async (req, res) => {
//   const { id } = req.params;
//   const { score } = req.body;

//   if (typeof score !== "number") {
//     return res.status(400).json({ message: "Invalid input, score must be a number" });
//   }

//   try {
//     const updatedScore = await Score.findByIdAndUpdate(id, { score }, { new: true });

//     if (!updatedScore) {
//       return res.status(404).json({ message: "Score not found" });
//     }

//     res.status(200).json({ message: "Score updated", score: updatedScore });
//   } catch (error) {
//     console.error("Error updating score:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Get all scores (users and admins can view) - GET /api/score
// router.get("/", async (req, res) => {
//   try {
//     const scores = await Score.find().sort({ score: -1 }); // Sort by score descending
//     res.status(200).json(scores);
//   } catch (error) {
//     console.error("Error fetching scores:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
