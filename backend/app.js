const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
const connectDB = require("./config/db");


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to the database");
    
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

start();
