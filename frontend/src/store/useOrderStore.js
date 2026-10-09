import { create } from 'zustand';

const ORDERS_STORAGE_KEY = 'crazy4u_orders_history_v1';

const INITIAL_ORDERS = [
  {
    id: 'CRZ-8921',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      { name: 'Paneer Tikka Fusion Pizza (Medium)', quantity: 1, unitPrice: 529 },
      { name: 'Cheesy Garlic Breadsticks', quantity: 1, unitPrice: 169 },
      { name: 'Coca-Cola Can (300ml)', quantity: 2, unitPrice: 60 }
    ],
    subtotal: 818,
    discount: 163,
    deliveryFee: 0,
    total: 655,
    paymentMethod: 'Google Pay',
    address: 'Flat 402, Sunshine Heights, Sector 14, Gurugram',
    status: 'Delivered',
    tokensEarned: 65,
    canCancel: false
  },
  {
    id: 'CRZ-7412',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      { name: 'Solo Feast: Burger + Fries + Coke', quantity: 2, unitPrice: 349 },
      { name: 'Molten Belgian Choco Lava Cake', quantity: 2, unitPrice: 119 }
    ],
    subtotal: 936,
    discount: 100,
    deliveryFee: 0,
    total: 836,
    paymentMethod: 'Cash on Delivery',
    address: 'Flat 402, Sunshine Heights, Sector 14, Gurugram',
    status: 'Delivered',
    tokensEarned: 84,
    canCancel: false
  }
];

const loadStoredOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_ORDERS;
  } catch {
    return INITIAL_ORDERS;
  }
};

export const useOrderStore = create((set, get) => ({
  orders: loadStoredOrders(),
  activeOrderId: null,
  showPackedPopup: false,

  setShowPackedPopup: (show) => set({ showPackedPopup: show }),

  // Create new order
  createOrder: ({ items, subtotal, discount, deliveryFee, total, paymentMethod, address }) => {
    const orderId = `CRZ-${Math.floor(1000 + Math.random() * 9000)}`;
    const tokensEarned = Math.round(total * 0.1); // 1 token per 10 rs

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: items.map(i => ({
        name: `${i.name} (${i.size || 'Regular'}${i.crust ? ', ' + i.crust : ''})`,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        image: i.image
      })),
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod,
      address: address ? `${address.street}, ${address.city} - ${address.pincode}` : 'Standard Address',
      status: 'Order Placed',
      statusStep: 1, // 1: Placed, 2: Prepared, 3: Packed, 4: Out for Delivery, 5: Delivered
      tokensEarned,
      rider: {
        name: 'Rahul Sharma',
        phone: '+91 98111 22334',
        vehicle: 'Honda Activa (DL 3S 8912)',
        rating: 4.9
      }
    };

    const updated = [newOrder, ...get().orders];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    set({ orders: updated, activeOrderId: orderId });

    return newOrder;
  },

  // Check if order is eligible for cancellation (within 5 minutes)
  isOrderCancellable: (orderId) => {
    const order = get().orders.find(o => o.id === orderId);
    if (!order) return { cancellable: false, remainingSeconds: 0 };
    if (order.status === 'Cancelled' || order.status === 'Delivered') {
      return { cancellable: false, remainingSeconds: 0 };
    }

    const orderTime = new Date(order.createdAt).getTime();
    const now = Date.now();
    const diffMs = now - orderTime;
    const maxWindowMs = 5 * 60 * 1000; // 5 minutes = 300,000 ms

    if (diffMs > maxWindowMs) {
      return { cancellable: false, remainingSeconds: 0 };
    }

    const remainingSeconds = Math.max(0, Math.floor((maxWindowMs - diffMs) / 1000));
    return { cancellable: true, remainingSeconds };
  },

  // Cancel order (Strict 5-minute validation)
  cancelOrder: (orderId) => {
    const check = get().isOrderCancellable(orderId);
    if (!check.cancellable) {
      return { 
        success: false, 
        message: 'Cancellation window expired. Orders can only be cancelled within 5 minutes of placement.' 
      };
    }

    const updated = get().orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Cancelled',
          statusStep: 0,
          tokensEarned: 0 // No tokens for cancelled orders
        };
      }
      return o;
    });

    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    set({ orders: updated });
    return { success: true, message: 'Order has been cancelled successfully. Refund initiated.' };
  },

  // Advance Order Status (for simulated delivery demo)
  advanceOrderStatus: (orderId) => {
    const order = get().orders.find(o => o.id === orderId);
    if (!order || order.status === 'Cancelled' || order.status === 'Delivered') return;

    const nextStep = (order.statusStep || 1) + 1;
    let nextStatus = order.status;

    if (nextStep === 2) nextStatus = 'Food is Being Prepared';
    if (nextStep === 3) {
      nextStatus = 'Order Packed';
      // Trigger the cute popup!
      set({ showPackedPopup: true });
    }
    if (nextStep === 4) nextStatus = 'Out for Delivery';
    if (nextStep === 5) nextStatus = 'Delivered';

    const updated = get().orders.map(o => 
      o.id === orderId ? { ...o, status: nextStatus, statusStep: nextStep } : o
    );

    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    set({ orders: updated });
  },

  getActiveOrder: () => {
    const id = get().activeOrderId;
    if (id) {
      return get().orders.find(o => o.id === id) || get().orders[0];
    }
    return get().orders[0];
  }
}));
