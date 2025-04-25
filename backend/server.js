// server.js (Node.js/Express backend)
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

// Middleware
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // For parsing JSON bodies

// MongoDB connection
connectDB();

// Example route
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
