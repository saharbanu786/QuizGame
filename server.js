const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const quizRoutes = require("./routes/quizRoutes");
//const scoreRoutes = require("./routes/scoreRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Log HTTP requests for easier debugging

// Default route to verify server is running
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

// Log every incoming request (for debugging purposes)
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Routes
app.use("/api/quiz", quizRoutes);
//app.use("/api/score", scoreRoutes);
app.use("/api/users", userRoutes);

// Catch-all route for undefined routes (this should be placed after your defined routes)
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handling Middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running"));
