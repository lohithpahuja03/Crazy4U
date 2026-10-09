const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check / Root route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Crazy4U Food Ordering API is running healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('Crazy4U API Server');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Crazy4U Server running on port ${PORT}`);
});

module.exports = app;
