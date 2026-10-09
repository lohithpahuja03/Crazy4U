const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Crazy4U Food Ordering API is running healthy',
    timestamp: new Date().toISOString()
  });
});

// Mount modular API routers
const foodRoutes = require('./src/routes/foodRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const authRoutes = require('./src/routes/authRoutes');
const offerRoutes = require('./src/routes/offerRoutes');
const tokenRoutes = require('./src/routes/tokenRoutes');

app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/tokens', tokenRoutes);

app.get('/', (req, res) => {
  res.json({
    brand: 'Crazy4U',
    version: '1.0.0',
    description: 'Food Ordering Commercial REST API',
    endpoints: [
      '/api/health',
      '/api/foods',
      '/api/orders',
      '/api/auth',
      '/api/offers',
      '/api/tokens'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Crazy4U Server running on http://localhost:${PORT}`);
});

module.exports = app;
