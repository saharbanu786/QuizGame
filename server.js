// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const quizRoutes = require('./routes/quizRoutes');
const app = express();

// Middleware and other configurations
app.use(express.json()); // Parse incoming JSON requests
app.use('/api/quiz', quizRoutes); // Use quizRoutes for handling quiz-related requests

// Example of environment variable usage
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Attempt to connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
