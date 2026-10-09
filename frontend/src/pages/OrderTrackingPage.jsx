import React, { useState, useEffect } from 'react';
import { useOrderStore } from '../store/useOrderStore';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import './OrderTrackingPage.css';

export default function OrderTrackingPage() {
  const navigate = useNavigate();
  const {
    orders,
    activeOrderId,
    isOrderCancellable,
    cancelOrder,
    advanceOrderStatus
  } = useOrderStore();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedOrderId, setSelectedOrderId] = useState(activeOrderId || orders[0]?.id);
  const [activeTab, setActiveTab] = useState('track'); // 'track' or 'history'
  const [remainingSec, setRemainingSec] = useState(0);

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  // 5-Minute Cancellation Timer Interval
  useEffect(() => {
    if (!currentOrder) return;

    const updateTimer = () => {
      const check = isOrderCancellable(currentOrder.id);
      setRemainingSec(check.remainingSeconds);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [currentOrder, isOrderCancellable]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCancelClick = async () => {
    if (!currentOrder) return;

    const confirmed = window.confirm(
      'Are you sure you want to cancel this order? This action cannot be undone and no tokens will be awarded.'
    );
    if (!confirmed) return;

    const res = cancelOrder(currentOrder.id);
    if (res.success) {
      toast.success(res.message);
      // Sync with backend
      await api.cancelOrder(currentOrder.id);
    } else {
      toast.error(res.message);
    }
  };

  const handleReorder = (order) => {
    if (order.items && order.items.length > 0) {
      order.items.forEach((item) => {
        addItem({
          id: `reorder_${Date.now()}_${item.name}`,
          name: item.name,
          image: item.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&auto=format&fit=crop&q=80',
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          isVeg: true
        });
      });
      toast.success(`Items from Order ${order.id} re-added to your cart! 🍕`);
      navigate('/cart');
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h3>No orders yet</h3>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>Place your first order to track it live!</p>
        <button className="btn-primary" onClick={() => navigate('/menu')}>
          Explore Food Menu 🍕
        </button>
      </div>
    );
  }

  const statusSteps = [
    { step: 1, label: 'Order Placed', icon: '📝', desc: 'Order received by restaurant' },
    { step: 2, label: 'Food is Being Prepared', icon: '🍳', desc: 'Chef is baking with fresh toppings' },
    { step: 3, label: 'Order Packed', icon: '📦', desc: 'Sealed with tamper-proof packaging' },
    { step: 4, label: 'Out for Delivery', icon: '🛵', desc: 'Rider is on the way to your address' },
    { step: 5, label: 'Delivered', icon: '🎉', desc: 'Enjoy your meal & Crazy4U tokens!' }
  ];

  const currentStep = currentOrder?.statusStep || 1;
  const isCancelled = currentOrder?.status === 'Cancelled';

  return (
    <div className="container tracking-page-container">
      {/* Tab Switcher */}
      <div className="tracking-tabs-header">
        <button
          className={`tab-btn ${activeTab === 'track' ? 'active' : ''}`}
          onClick={() => setActiveTab('track')}
        >
          Live Tracking 🛵
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Previous Orders ({orders.length}) 📋
        </button>
      </div>

      {activeTab === 'track' ? (
        <div className="tracking-layout-grid">
          {/* Main Tracking Details */}
          <div className="tracking-main-col">
            <div className="tracking-status-card crazy-card">
              <div className="tracking-top-meta">
                <div>
                  <span className="order-chip-id">Order ID: {currentOrder.id}</span>
                  <span className="order-time-text">
                    Placed at {new Date(currentOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {isCancelled ? (
                  <span className="status-badge-cancelled">Order Cancelled</span>
                ) : (
                  <span className="status-badge-active">
                    {currentOrder.status}
                  </span>
                )}
              </div>

              {/* Status Progression Timeline */}
              <div className="timeline-wrapper">
                {statusSteps.map((stepItem) => {
                  const isDone = !isCancelled && currentStep >= stepItem.step;
                  const isCurrent = !isCancelled && currentStep === stepItem.step;

                  return (
                    <div
                      key={stepItem.step}
                      className={`timeline-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                    >
                      <div className="step-circle">
                        {isDone ? '✓' : stepItem.icon}
                      </div>
                      <div className="step-content">
                        <strong className="step-label">{stepItem.label}</strong>
                        <span className="step-desc">{stepItem.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DEMO STATUS ADVANCE BUTTON */}
              {!isCancelled && currentStep < 5 && (
                <div className="demo-advance-bar">
                  <span>Demo Simulator:</span>
                  <button
                    className="btn-advance-demo"
                    onClick={() => advanceOrderStatus(currentOrder.id)}
                  >
                    Advance Status to Step {currentStep + 1} ⚡
                  </button>
                </div>
              )}

              {/* 5-MINUTE CANCELLATION RESTRICTION (Section 27) */}
              <div className="cancellation-section-card">
                {isCancelled ? (
                  <div className="cancelled-notice-box">
                    <span>❌ This order was cancelled. Refund processed to original payment method.</span>
                  </div>
                ) : remainingSec > 0 ? (
                  <div className="cancellation-active-box">
                    <div>
                      <strong className="cancel-title">Cancellation Window Open</strong>
                      <p className="cancel-sub">
                        You may cancel this order within the next{' '}
                        <span className="cancel-timer-chip">{formatTimer(remainingSec)}</span>
                      </p>
                    </div>
                    <button className="btn-cancel-order" onClick={handleCancelClick}>
                      Cancel Order
                    </button>
                  </div>
                ) : (
                  <div className="cancellation-expired-box">
                    <span>⏱️ Cancellation window expired (Allowed only within 5 minutes of placing).</span>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Rider Card */}
            {!isCancelled && currentOrder.rider && (
              <div className="rider-card crazy-card">
                <div className="rider-avatar">🛵</div>
                <div className="rider-info">
                  <span className="rider-label">Your Delivery Partner</span>
                  <strong className="rider-name">{currentOrder.rider.name}</strong>
                  <span className="rider-rating">★ {currentOrder.rider.rating} Rating • {currentOrder.rider.vehicle}</span>
                </div>
                <div className="rider-distance-eta">
                  <span className="eta-badge">12 Mins Away</span>
                  <span className="distance-label">Approx 1.8 km away</span>
                </div>
              </div>
            )}
          </div>

          {/* Side: Order Items & Delivery Location */}
          <div className="tracking-side-col">
            <div className="side-order-card crazy-card">
              <h4 className="side-card-title">Order Summary</h4>
              <div className="side-items-list">
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} className="side-item-row">
                    <div>
                      <span className="side-item-qty">{item.quantity}x</span>
                      <span className="side-item-name">{item.name}</span>
                    </div>
                    <span className="side-item-price">₹{item.unitPrice * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="bill-divider"></div>

              <div className="bill-row">
                <span className="bill-label">Delivery Address:</span>
                <span className="bill-value address-side-val">{currentOrder.address}</span>
              </div>
              <div className="bill-row">
                <span className="bill-label">Payment:</span>
                <span className="bill-value">{currentOrder.paymentMethod}</span>
              </div>
              <div className="bill-row total-row">
                <span className="total-label">Total Amount</span>
                <span className="total-amount">₹{currentOrder.total.toLocaleString('en-IN')}</span>
              </div>

              {/* Tokens Info */}
              {!isCancelled && currentOrder.tokensEarned > 0 && (
                <div className="tokens-awarded-chip">
                  🪙 <strong>+{currentOrder.tokensEarned} Crazy4U Tokens</strong> Earned
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* PREVIOUS ORDERS TAB */
        <div className="orders-history-list">
          {orders.map((ord) => (
            <div key={ord.id} className="history-order-card crazy-card">
              <div className="history-top-row">
                <div>
                  <strong className="history-id">{ord.id}</strong>
                  <span className="history-date">
                    {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <div className="history-status-wrap">
                  <span className={`history-status-badge ${ord.status === 'Cancelled' ? 'cancelled' : 'delivered'}`}>
                    {ord.status}
                  </span>
                </div>
              </div>

              <div className="history-items-summary">
                {ord.items.map((it, i) => (
                  <span key={i} className="history-item-pill">
                    {it.quantity}x {it.name}
                  </span>
                ))}
              </div>

              <div className="history-bottom-row">
                <div className="history-total-price">
                  <span>Total:</span>
                  <strong>₹{ord.total.toLocaleString('en-IN')}</strong>
                  <span className="history-pay-method">({ord.paymentMethod})</span>
                </div>

                <div className="history-actions">
                  <button
                    className="btn-secondary btn-sm"
                    onClick={() => {
                      setSelectedOrderId(ord.id);
                      setActiveTab('track');
                    }}
                  >
                    View Status 🛵
                  </button>
                  <button
                    className="btn-primary btn-sm"
                    onClick={() => handleReorder(ord)}
                  >
                    Reorder 🍕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
