const express = require('express');
const router = express.Router();

let tokenTransactions = [
  {
    id: 'tx_1',
    orderId: 'CRZ-8921',
    tokensEarned: 56,
    type: 'CREDIT',
    description: 'Reward tokens for Order CRZ-8921',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'tx_2',
    orderId: 'CRZ-7412',
    tokensEarned: 84,
    type: 'CREDIT',
    description: 'Reward tokens for Order CRZ-7412',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'tx_welcome',
    orderId: null,
    tokensEarned: 200,
    type: 'CREDIT',
    description: 'Crazy4U Welcome Bonus Reward',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// GET /api/tokens/balance
router.get('/balance', (req, res) => {
  const total = tokenTransactions.reduce((acc, t) => acc + (t.type === 'CREDIT' ? t.tokensEarned : -t.tokensEarned), 910);
  res.json({
    success: true,
    data: {
      tokenBalance: total,
      conversionRate: '1 Token = ₹0.50 Discount value',
      rewardRate: '1 Token for every ₹10 spent on successful deliveries'
    }
  });
});

// GET /api/tokens/history
router.get('/history', (req, res) => {
  res.json({
    success: true,
    count: tokenTransactions.length,
    data: tokenTransactions
  });
});

module.exports = router;
