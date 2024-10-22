require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
  }
};

module.exports = connectDB;
