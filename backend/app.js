// app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const fashionRoutes = require('./routes/fashionRoutes');

// Load environment variables from the .env file
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors()); // Enable cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use('/api', fashionRoutes); // Use routes defined in fashionRoutes.js

// Error handling for unsupported routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
