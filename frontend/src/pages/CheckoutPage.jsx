import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useOrderStore } from '../store/useOrderStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { items, getSubtotal, getDiscount, getDeliveryFee, getTotal, clearCart } = useCartStore();
  const { user, addAddress } = useAuthStore();
  const { createOrder } = useOrderStore();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  // State
  const [selectedAddressId, setSelectedAddressId] = useState(user?.addresses?.[0]?.id || null);
  const [paymentMethod, setPaymentMethod] = useState('Google Pay');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({ tag: 'Home', street: '', city: 'Gurugram', pincode: '122001' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // REDIRECT IF EMPTY CART
  if (!items || items.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h3>Your cart is empty</h3>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>Please add some items to your tray before proceeding to checkout.</p>
        <Link to="/menu" className="btn-primary">Explore Menu 🍕</Link>
      </div>
    );
  }

  // COD RESTRICTION CHECK (Rule: ₹599 <= total <= ₹4,999)
  const isCodTooLow = total < 599;
  const isCodTooHigh = total > 4999;
  const isCodAvailable = !isCodTooLow && !isCodTooHigh;

  const handleAddNewAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.street) {
      toast.error('Please enter street address');
      return;
    }
    addAddress(newAddr);
    setShowAddAddress(false);
    toast.success('Address saved successfully!');
  };

  const handlePlaceOrder = async () => {
    if (user?.addresses?.length > 0 && !selectedAddressId) {
      toast.error('Please select a delivery address');
      return;
    }

    // Double check COD validity
    if (paymentMethod === 'Cash on Delivery' && !isCodAvailable) {
      if (isCodTooLow) {
        toast.error('Cash on Delivery unavailable. COD is available for orders from ₹599.');
      } else {
        toast.error('Cash on Delivery unavailable. COD is available up to ₹4,999.');
      }
      return;
    }

    setIsSubmitting(true);

    const chosenAddress = user?.addresses?.find((a) => a.id === selectedAddressId) || {
      street: '123 Prime Boulevard',
      city: 'Delhi NCR',
      pincode: '110001'
    };

    const orderPayload = {
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod,
      address: chosenAddress
    };

    // 1. Create in frontend store
    const created = createOrder(orderPayload);

    // 2. Sync with backend API
    await api.createOrder(orderPayload);

    // 3. Clear cart
    clearCart();

    toast.success('Order placed successfully! 🎉', {
      duration: 4000,
      iconTheme: { primary: '#e22525', secondary: '#fff' }
    });

    setIsSubmitting(false);
    navigate(`/order-confirmation?orderId=${created.id}`);
  };

  return (
    <div className="container checkout-page-container">
      <h1 className="checkout-title">Checkout & Payment</h1>
      <p className="checkout-subtitle">Complete your delivery address and choose your payment method.</p>

      <div className="checkout-layout-grid">
        {/* Left Column: Address & Payment Selection */}
        <div className="checkout-main-col">
          {/* 1. DELIVERY ADDRESS SECTION */}
          <div className="checkout-card crazy-card">
            <div className="card-header-flex">
              <div>
                <span className="step-tag">Step 1</span>
                <h3 className="card-section-title">Delivery Address</h3>
              </div>
              <button
                type="button"
                className="btn-add-addr-toggle"
                onClick={() => setShowAddAddress(!showAddAddress)}
              >
                {showAddAddress ? 'Cancel' : '+ Add New Address'}
              </button>
            </div>

            {/* Existing Addresses */}
            <div className="addresses-list-grid">
              {(user?.addresses || []).map((addr) => (
                <label
                  key={addr.id}
                  className={`address-select-card ${selectedAddressId === addr.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAddressId(addr.id)}
                >
                  <div className="addr-top-row">
                    <span className="addr-tag-badge">{addr.tag}</span>
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                    />
                  </div>
                  <p className="addr-street-text">{addr.street}</p>
                  <span className="addr-city-text">{addr.city} — {addr.pincode}</span>
                </label>
              ))}
            </div>

            {/* Add Address Form Modal/Inline */}
            {showAddAddress && (
              <form onSubmit={handleAddNewAddressSubmit} className="add-address-form">
                <h5>Add New Delivery Location</h5>
                <div className="addr-form-grid">
                  <div className="form-group">
                    <label>Label</label>
                    <select
                      value={newAddr.tag}
                      onChange={(e) => setNewAddr({ ...newAddr, tag: e.target.value })}
                    >
                      <option value="Home">Home 🏠</option>
                      <option value="Office">Office 🏢</option>
                      <option value="Other">Other 📍</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Street Address *</label>
                    <input
                      type="text"
                      placeholder="Flat, building, landmark..."
                      value={newAddr.street}
                      onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary btn-save-addr">
                  Save Address
                </button>
              </form>
            )}
          </div>

          {/* 2. PAYMENT METHOD SECTION */}
          <div className="checkout-card crazy-card">
            <span className="step-tag">Step 2</span>
            <h3 className="card-section-title">Select Payment Method</h3>
            <p className="payment-note">All digital transactions are encrypted with 256-bit security.</p>

            <div className="payment-methods-grid">
              {/* Google Pay */}
              <label
                className={`payment-option-card ${paymentMethod === 'Google Pay' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('Google Pay')}
              >
                <div className="payment-icon-head">
                  <span className="pay-logo">⚡ GPay</span>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Google Pay'}
                    onChange={() => setPaymentMethod('Google Pay')}
                  />
                </div>
                <strong>Google Pay UPI</strong>
                <span className="pay-desc">Instant UPI transfer via GPay application</span>
              </label>

              {/* Paytm */}
              <label
                className={`payment-option-card ${paymentMethod === 'Paytm' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('Paytm')}
              >
                <div className="payment-icon-head">
                  <span className="pay-logo">📱 Paytm</span>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Paytm'}
                    onChange={() => setPaymentMethod('Paytm')}
                  />
                </div>
                <strong>Paytm Wallet / UPI</strong>
                <span className="pay-desc">Pay directly using Paytm Wallet, Netbanking, or UPI</span>
              </label>

              {/* Cash On Delivery (COD) */}
              <label
                className={`payment-option-card cod-option ${paymentMethod === 'Cash on Delivery' ? 'selected' : ''} ${!isCodAvailable ? 'disabled' : ''}`}
                onClick={() => {
                  if (isCodAvailable) setPaymentMethod('Cash on Delivery');
                }}
              >
                <div className="payment-icon-head">
                  <span className="pay-logo">💵 COD</span>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Cash on Delivery'}
                    disabled={!isCodAvailable}
                    onChange={() => {
                      if (isCodAvailable) setPaymentMethod('Cash on Delivery');
                    }}
                  />
                </div>
                <strong>Cash on Delivery</strong>
                <span className="pay-desc">Pay cash to delivery executive upon arrival</span>

                {/* COD CONSTRAINT MESSAGE */}
                {!isCodAvailable && (
                  <div className="cod-alert-box">
                    {isCodTooLow && (
                      <span>⚠️ Cash on Delivery unavailable. COD is available for orders from ₹599.</span>
                    )}
                    {isCodTooHigh && (
                      <span>⚠️ Cash on Delivery unavailable. COD is available up to ₹4,999.</span>
                    )}
                  </div>
                )}
                {isCodAvailable && (
                  <div className="cod-available-tag">
                    ✓ Available for this order (₹599 - ₹4,999)
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Confirmation */}
        <div className="checkout-side-col">
          <div className="checkout-summary-card crazy-card">
            <h4 className="summary-title">Order Overview</h4>

            <div className="checkout-items-preview">
              {items.map((item) => (
                <div key={item.itemKey} className="checkout-item-row">
                  <div className="checkout-item-title-wrap">
                    <span className="checkout-qty">{item.quantity}x</span>
                    <span className="checkout-item-name">{item.name}</span>
                  </div>
                  <span className="checkout-item-price">₹{item.unitPrice * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="bill-divider"></div>

            <div className="bill-row">
              <span className="bill-label">Subtotal</span>
              <span className="bill-value">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {discount > 0 && (
              <div className="bill-row discount-row">
                <span className="bill-label">Discount Applied</span>
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
              <span className="total-label">Total to Pay</span>
              <span className="total-amount">₹{total.toLocaleString('en-IN')}</span>
            </div>

            {/* Tokens Rewards Callout */}
            <div className="tokens-checkout-callout">
              <span className="token-coin-icon">🪙</span>
              <div>
                <strong>+{Math.round(total * 0.1)} Crazy4U Tokens</strong>
                <p>Will be added to your profile upon successful delivery!</p>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary place-order-btn"
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Placing Order...' : `Place Order • ₹${total.toLocaleString('en-IN')}`}
            </button>

            <p className="cancellation-policy-notice">
              ⏱️ <strong>Cancellation Policy:</strong> You may cancel this order within <strong>5 minutes</strong> of placing it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
