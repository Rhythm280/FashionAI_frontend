const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;
    if (!dbURI) throw new Error('MongoDB URI is not defined');

    await mongoose.connect(dbURI); // No extra options needed ✅
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};


start();
