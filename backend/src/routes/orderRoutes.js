const express = require('express');
const router = express.Router();

// In-memory orders store for fast, reliable local operation
let ordersDb = [
  {
    id: 'CRZ-8921',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      { name: 'Paneer Tikka Fusion Pizza (Medium)', quantity: 1, unitPrice: 529 },
      { name: 'Cheesy Garlic Breadsticks', quantity: 1, unitPrice: 169 }
    ],
    subtotal: 698,
    discount: 139,
    deliveryFee: 0,
    total: 559,
    paymentMethod: 'Google Pay',
    address: 'Flat 402, Sunshine Heights, Sector 14, Gurugram',
    status: 'Delivered',
    statusStep: 5,
    tokensEarned: 56
  }
];

// POST /api/orders — Create new order with strict server-side validation
router.post('/', (req, res) => {
  try {
    const { items, subtotal, discount, deliveryFee, total, paymentMethod, address } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
    }

    if (!paymentMethod) {
      return res.status(400).json({ success: false, message: 'Payment method is required' });
    }

    // STRICT COD RULE VALIDATION
    if (paymentMethod === 'Cash on Delivery') {
      if (total < 599) {
        return res.status(400).json({
          success: false,
          message: 'Cash on Delivery unavailable. COD is available for orders from ₹599.'
        });
      }
      if (total > 4999) {
        return res.status(400).json({
          success: false,
          message: 'Cash on Delivery unavailable. COD is available up to ₹4,999.'
        });
      }
    }

    // Calculate loyalty tokens (10% back, 1 token per 10 rupees)
    const tokensEarned = Math.round(total * 0.1);
    const orderId = `CRZ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items,
      subtotal: Number(subtotal),
      discount: Number(discount || 0),
      deliveryFee: Number(deliveryFee || 0),
      total: Number(total),
      paymentMethod,
      address,
      status: 'Order Placed',
      statusStep: 1,
      tokensEarned,
      rider: {
        name: 'Rahul Sharma',
        phone: '+91 98111 22334',
        vehicle: 'Honda Activa (DL 3S 8912)',
        rating: 4.9
      }
    };

    ordersDb.unshift(newOrder);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: newOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error creating order' });
  }
});

// GET /api/orders — Retrieve all orders
router.get('/', (req, res) => {
  res.json({ success: true, count: ordersDb.length, data: ordersDb });
});

// GET /api/orders/:id — Get order details
router.get('/:id', (req, res) => {
  const order = ordersDb.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  // Calculate remaining cancellation window in seconds
  const orderTime = new Date(order.createdAt).getTime();
  const diffMs = Date.now() - orderTime;
  const maxWindowMs = 5 * 60 * 1000;
  const cancellable = order.status !== 'Cancelled' && order.status !== 'Delivered' && diffMs <= maxWindowMs;
  const remainingSeconds = cancellable ? Math.max(0, Math.floor((maxWindowMs - diffMs) / 1000)) : 0;

  res.json({
    success: true,
    data: {
      ...order,
      cancellable,
      cancellationRemainingSeconds: remainingSeconds
    }
  });
});

// POST /api/orders/:id/cancel — STRICT 5-MINUTE CANCELLATION VALIDATION
router.post('/:id/cancel', (req, res) => {
  const order = ordersDb.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  if (order.status === 'Cancelled') {
    return res.status(400).json({ success: false, message: 'Order is already cancelled' });
  }

  if (order.status === 'Delivered') {
    return res.status(400).json({ success: false, message: 'Delivered orders cannot be cancelled' });
  }

  // 5 MINUTES (300,000 MS) STRICT ENFORCEMENT
  const orderTime = new Date(order.createdAt).getTime();
  const now = Date.now();
  const diffMs = now - orderTime;
  const maxAllowedMs = 5 * 60 * 1000; // 5 mins

  if (diffMs > maxAllowedMs) {
    return res.status(400).json({
      success: false,
      message: 'Cancellation window expired. Orders can only be cancelled within 5 minutes of placement.'
    });
  }

  order.status = 'Cancelled';
  order.statusStep = 0;
  order.tokensEarned = 0; // Cancelled orders earn NO tokens!

  res.json({
    success: true,
    message: 'Order cancelled successfully within the 5-minute window. Refund has been initiated.',
    data: order
  });
});

module.exports = router;
