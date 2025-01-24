const mongoose = require('mongoose');

const connectDB = async () => {
  console.log("Attempting to connect to MongoDB...");
  try {
    mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);  // Exit process if the connection fails
  }
};

module.exports = connectDB;
