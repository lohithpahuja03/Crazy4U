import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { PROMOTIONAL_OFFERS } from '../data/foodData';
import toast from 'react-hot-toast';
import './CartPage.css';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getDeliveryFee,
    getTotal
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      toast.success(res.message);
      setCouponInput('');
    } else {
      toast.error(res.message);
    }
  };

  const handleQuickApply = (code) => {
    const res = applyCoupon(code);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  // 1. EMPTY CART STATE
  if (!items || items.length === 0) {
    return (
      <div className="container cart-empty-wrap">
        <div className="cart-empty-card crazy-card">
          <div className="empty-cart-emoji">🍕💔</div>
          <h2 className="empty-cart-title">Your cart is feeling lonely.</h2>
          <p className="empty-cart-desc">
            Your tray is empty! Explore our artisanal pizzas, juicy burgers, crispy fries, and refreshing shakes to get the party started.
          </p>
          <Link to="/menu" className="btn-primary empty-cart-btn">
            Explore Menu 🍽️
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page-container">
      <div className="cart-header-row">
        <div>
          <h1 className="cart-title">Your Food Tray</h1>
          <p className="cart-subtitle">Review your customized items, apply discounts, and checkout.</p>
        </div>
        <button className="clear-cart-text-btn" onClick={clearCart}>
          Clear All 🗑️
        </button>
      </div>

      <div className="cart-layout-grid">
        {/* Left: Cart Items List */}
        <div className="cart-items-column">
          <div className="cart-items-list">
            {items.map((item) => (
              <div key={item.itemKey} className="cart-item-card crazy-card">
                <img src={item.image} alt={item.name} className="cart-item-img" />

                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <div>
                      <span className={item.isVeg ? 'badge-veg' : 'badge-nonveg'} style={{ marginRight: '6px' }}></span>
                      <strong className="cart-item-name">{item.name}</strong>
                    </div>
                    <button
                      className="cart-item-del-btn"
                      onClick={() => removeItem(item.itemKey)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Size & Customization summary */}
                  <div className="cart-item-meta">
                    {item.size && <span className="meta-pill">{item.size}</span>}
                    {item.crust && <span className="meta-pill">{item.crust}</span>}
                    {item.addons && item.addons.length > 0 && (
                      <span className="meta-pill addons-pill">
                        +{item.addons.map((a) => a.name).join(', ')}
                      </span>
                    )}
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="cart-item-bottom">
                    <div className="cart-item-price-wrap">
                      <span className="unit-price">₹{item.unitPrice} each</span>
                      <span className="line-total">₹{item.unitPrice * item.quantity}</span>
                    </div>

                    <div className="cart-quantity-stepper">
                      <button
                        className="stepper-action-btn"
                        onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="stepper-count">{item.quantity}</span>
                      <button
                        className="stepper-action-btn"
                        onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery threshold hint */}
          <div className="free-delivery-hint-card">
            {subtotal >= 500 ? (
              <p className="free-delivery-active">
                🎉 <strong>Free Delivery Unlocked!</strong> You saved ₹40 on shipping charges.
              </p>
            ) : (
              <p className="free-delivery-pending">
                🚚 Add <strong>₹{500 - subtotal}</strong> more to unlock <strong>FREE Delivery!</strong>
              </p>
            )}
          </div>
        </div>

        {/* Right: Bill Summary & Coupon Code */}
        <div className="cart-summary-column">
          {/* Coupon Code Card */}
          <div className="coupon-card crazy-card">
            <h4 className="coupon-card-title">Apply Promo Code</h4>
            {appliedCoupon ? (
              <div className="applied-coupon-row">
                <div className="coupon-badge-wrap">
                  <span className="applied-code-text">🏷️ {appliedCoupon.code}</span>
                  <span className="applied-code-desc">{appliedCoupon.title}</span>
                </div>
                <button className="remove-coupon-btn" onClick={removeCoupon}>
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="coupon-form">
                <input
                  type="text"
                  placeholder="Enter coupon code..."
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                />
                <button type="submit" className="apply-coupon-btn">
                  Apply
                </button>
              </form>
            )}

            {/* Quick Available Coupons Chips */}
            <div className="quick-coupons-wrap">
              <span className="quick-coupons-title">Available Offers:</span>
              <div className="quick-coupons-list">
                {PROMOTIONAL_OFFERS.map((offer) => (
                  <button
                    key={offer.code}
                    className="quick-coupon-chip"
                    onClick={() => handleQuickApply(offer.code)}
                  >
                    <strong>{offer.code}</strong> — {offer.discountPercent ? `${offer.discountPercent}% OFF` : `₹${offer.discountFlat} OFF`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bill Summary Card */}
          <div className="bill-summary-card crazy-card">
            <h4 className="bill-title">Order Bill Details</h4>

            <div className="bill-row">
              <span className="bill-label">Item Subtotal</span>
              <span className="bill-value">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {discount > 0 && (
              <div className="bill-row discount-row">
                <span className="bill-label">Promo Discount ({appliedCoupon?.code})</span>
                <span className="bill-value">-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="bill-row">
              <span className="bill-label">Delivery Fee</span>
              <span className="bill-value">
                {deliveryFee === 0 ? <span className="free-tag">FREE</span> : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="bill-divider"></div>

            <div className="bill-row total-row">
              <span className="total-label">Final Payable Amount</span>
              <span className="total-amount">₹{total.toLocaleString('en-IN')}</span>
            </div>

            {/* Loyalty Tokens reward preview */}
            <div className="tokens-reward-preview">
              <span>🪙 You will earn <strong>{Math.round(total * 0.1)} Crazy4U Tokens</strong> with this order!</span>
            </div>

            <button
              className="btn-primary checkout-proceed-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
