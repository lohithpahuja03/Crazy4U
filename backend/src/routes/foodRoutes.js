const express = require('express');
const router = express.Router();
const FOODS = require('../data/foods');

// GET all foods with optional filters: ?search=...&category=...&isVeg=...
router.get('/', (req, res) => {
  try {
    let result = [...FOODS];
    const { search, category, isVeg } = req.query;

    if (category && category !== 'all') {
      result = result.filter(f => f.category.toLowerCase() === category.toLowerCase());
    }

    if (isVeg !== undefined) {
      const vegBool = isVeg === 'true';
      result = result.filter(f => f.isVeg === vegBool);
    }

    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      result = result.filter(f => 
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: result.length, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving food catalogue' });
  }
});

// GET single food item by ID
router.get('/:id', (req, res) => {
  const item = FOODS.find(f => f.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Food item not found' });
  }
  res.json({ success: true, data: item });
});

module.exports = router;
