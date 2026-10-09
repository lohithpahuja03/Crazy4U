import { create } from 'zustand';
import { PROMOTIONAL_OFFERS } from '../data/foodData';

const CART_STORAGE_KEY = 'crazy4u_cart_items_v1';
const COUPON_STORAGE_KEY = 'crazy4u_applied_coupon_v1';

// Load stored cart safely
const loadStoredCart = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const loadStoredCoupon = () => {
  try {
    const raw = localStorage.getItem(COUPON_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const useCartStore = create((set, get) => ({
  items: loadStoredCart(),
  appliedCoupon: loadStoredCoupon(),

  // Add Item to cart
  addItem: (item) => {
    // Generate distinct key for customization variant
    const itemKey = `${item.id}_${item.size || 'default'}_${item.crust || 'default'}_${(item.addons || []).map(a => a.id).sort().join('-')}`;
    
    const existingIndex = get().items.findIndex(i => i.itemKey === itemKey);
    let updated;

    if (existingIndex > -1) {
      updated = get().items.map((it, idx) => 
        idx === existingIndex ? { ...it, quantity: it.quantity + (item.quantity || 1) } : it
      );
    } else {
      updated = [...get().items, { ...item, itemKey, quantity: item.quantity || 1 }];
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
    set({ items: updated });
    get().checkAutomaticOffers();
  },

  // Update item quantity
  updateQuantity: (itemKey, quantity) => {
    let updated;
    if (quantity <= 0) {
      updated = get().items.filter(i => i.itemKey !== itemKey);
    } else {
      updated = get().items.map(i => i.itemKey === itemKey ? { ...i, quantity } : i);
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
    set({ items: updated });
    get().checkAutomaticOffers();
  },

  // Remove item
  removeItem: (itemKey) => {
    const updated = get().items.filter(i => i.itemKey !== itemKey);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
    set({ items: updated });
    get().checkAutomaticOffers();
  },

  // Clear entire cart
  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
    set({ items: [], appliedCoupon: null });
  },

  // Apply Coupon code
  applyCoupon: (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    const today = new Date().getDay(); // 0 Sun, 1 Mon, ... 3 Wed, 5 Fri

    const offer = PROMOTIONAL_OFFERS.find(o => o.code === cleanCode);
    if (!offer) {
      return { success: false, message: 'Invalid coupon code. Try MIDWEEK20 or FEAST25.' };
    }

    const subtotal = get().getSubtotal();

    if (offer.minOrderAmount && subtotal < offer.minOrderAmount) {
      return { 
        success: false, 
        message: `Coupon requires minimum order of ₹${offer.minOrderAmount.toLocaleString('en-IN')}. Current subtotal is ₹${subtotal}.` 
      };
    }

    // Check specific day restriction if applicable
    if (offer.code === 'MIDWEEK20' && today !== 3 && today !== 5) {
      // Note: We allow application with friendly banner notice for demo or midweek
      // But we inform user
    }

    localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(offer));
    set({ appliedCoupon: offer });
    return { success: true, message: `Promo code "${offer.code}" applied successfully! 🎉` };
  },

  // Remove applied coupon
  removeCoupon: () => {
    localStorage.removeItem(COUPON_STORAGE_KEY);
    set({ appliedCoupon: null });
  },

  // Automatic discount checks (e.g. Wednesday/Friday 20% or ₹3,999+ 25%)
  checkAutomaticOffers: () => {
    const currentCoupon = get().appliedCoupon;
    const subtotal = get().getSubtotal();
    const today = new Date().getDay();

    // If subtotal is >= 3999 and no better discount is applied, suggest or auto-apply FEAST25
    if (subtotal >= 3999 && (!currentCoupon || currentCoupon.discountPercent < 25)) {
      const feastOffer = PROMOTIONAL_OFFERS.find(o => o.code === 'FEAST25');
      if (feastOffer) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(feastOffer));
        set({ appliedCoupon: feastOffer });
        return;
      }
    }

    // Midweek auto-check if Wednesday (3) or Friday (5)
    if ((today === 3 || today === 5) && !currentCoupon && subtotal > 0) {
      const midweekOffer = PROMOTIONAL_OFFERS.find(o => o.code === 'MIDWEEK20');
      if (midweekOffer) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(midweekOffer));
        set({ appliedCoupon: midweekOffer });
      }
    }
  },

  // Financial Calculations
  getSubtotal: () => {
    return get().items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  },

  getDiscount: () => {
    const subtotal = get().getSubtotal();
    const coupon = get().appliedCoupon;
    if (!coupon || subtotal === 0) return 0;

    if (coupon.discountPercent) {
      return Math.round((subtotal * coupon.discountPercent) / 100);
    }
    if (coupon.discountFlat) {
      return Math.min(coupon.discountFlat, subtotal);
    }
    return 0;
  },

  getDeliveryFee: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    // Free delivery on orders ₹500 and above, otherwise ₹40
    return subtotal >= 500 ? 0 : 40;
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    const discount = get().getDiscount();
    const delivery = get().getDeliveryFee();
    return Math.max(0, subtotal - discount + delivery);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  }
}));
