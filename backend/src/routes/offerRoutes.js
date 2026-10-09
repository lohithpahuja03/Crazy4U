const express = require('express');
const router = express.Router();

const OFFERS = [
  {
    code: 'MIDWEEK20',
    title: '20% OFF Every Wednesday & Friday',
    discountPercent: 20,
    validDays: [3, 5],
    minOrderAmount: 0,
    description: 'Flat 20% discount on all food orders every Wednesday and Friday.'
  },
  {
    code: 'FEAST25',
    title: '25% OFF On Orders Above ₹3,999',
    discountPercent: 25,
    minOrderAmount: 3999,
    validDays: [0, 1, 2, 3, 4, 5, 6],
    description: 'Instant 25% discount for party and feast orders above ₹3,999.'
  },
  {
    code: 'CRAZYFIRST',
    title: 'Flat ₹100 OFF On First Order',
    discountFlat: 100,
    minOrderAmount: 499,
    validDays: [0, 1, 2, 3, 4, 5, 6],
    description: 'Welcome gift for first order above ₹499.'
  }
];

// GET /api/offers
router.get('/', (req, res) => {
  res.json({ success: true, count: OFFERS.length, data: OFFERS });
});

// POST /api/offers/validate
router.post('/validate', (req, res) => {
  const { code, subtotal } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code is required' });
  }

  const cleanCode = code.trim().toUpperCase();
  const offer = OFFERS.find(o => o.code === cleanCode);

  if (!offer) {
    return res.status(404).json({ success: false, message: 'Invalid promo code' });
  }

  if (offer.minOrderAmount && subtotal < offer.minOrderAmount) {
    return res.status(400).json({
      success: false,
      message: `Minimum order amount of ₹${offer.minOrderAmount} required for this coupon.`
    });
  }

  let discountAmount = 0;
  if (offer.discountPercent) {
    discountAmount = Math.round((subtotal * offer.discountPercent) / 100);
  } else if (offer.discountFlat) {
    discountAmount = Math.min(offer.discountFlat, subtotal);
  }

  res.json({
    success: true,
    message: `Promo code "${offer.code}" applied!`,
    data: {
      offer,
      discountAmount
    }
  });
});

module.exports = router;
