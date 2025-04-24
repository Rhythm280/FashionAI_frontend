const mongoose = require('mongoose');
require('dotenv').config();  // Make sure dotenv is loaded correctly
const fashionRoutes = require('./routes/fashionRoutes');
const cors = require('cors');
const express = require('express');

const app = express();

// Middleware
app.use(express.json());  // Middleware to parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Resource Sharing

// Routes
app.use('/api/fashion', fashionRoutes);

// MongoDB Connection
const connectDB = async () => {
    try {
        const dbURI = process.env.MONGODB_URI; // MongoDB URI from the .env file
        if (!dbURI) {
            throw new Error('MongoDB URI is not defined');  // This will catch missing or incorrect URI
        }

        // Connect to MongoDB
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error: ', err.message);
        process.exit(1);  // Exit the process if DB connection fails
    }
};

connectDB();

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
