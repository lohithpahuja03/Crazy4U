const express = require('express');
const router = express.Router();

let usersDb = [
  {
    id: 'usr_demo_77',
    name: 'Lohith Pahuja',
    email: 'lohith@example.com',
    phone: '+91 98765 43210',
    tokenBalance: 1250,
    addresses: [
      {
        id: 'addr_1',
        tag: 'Home',
        street: 'Flat 402, Sunshine Heights, Sector 14',
        city: 'Gurugram',
        pincode: '122001',
        isDefault: true
      }
    ]
  }
];

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  }

  const existing = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'User with this email already exists' });
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email,
    phone: phone || '',
    tokenBalance: 200, // 200 welcome bonus tokens
    addresses: []
  };

  usersDb.push(newUser);
  res.status(201).json({
    success: true,
    message: 'Registration successful! Welcome bonus 200 tokens credited.',
    data: newUser
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase()) || usersDb[0];
  res.json({
    success: true,
    message: 'Login successful',
    data: user
  });
});

// GET /api/auth/profile
router.get('/profile', (req, res) => {
  res.json({ success: true, data: usersDb[0] });
});

module.exports = router;
