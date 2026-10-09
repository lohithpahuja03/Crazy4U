import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/useOrderStore';
import './OrderConfirmationPage.css';

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId');

  const { orders } = useOrderStore();
  const order = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="container confirmation-page-container">
      <div className="confirmation-card crazy-card">
        {/* Animated Celebration Icon */}
        <div className="confetti-check-circle">
          <span className="check-mark-big">✓</span>
        </div>

        <span className="confirm-badge">ORDER PLACED SUCCESSFULLY</span>
        <h1 className="confirm-heading">Order Confirmed! 🎉</h1>
        <p className="confirm-sub">
          Your chef is firing up the kitchen. We've received your order and will have it delivered hot and fresh!
        </p>

        {order && (
          <div className="order-details-box">
            <div className="order-detail-row">
              <span className="detail-label">Order Number:</span>
              <strong className="detail-val order-num-val">{order.id}</strong>
            </div>

            <div className="order-detail-row">
              <span className="detail-label">Estimated Delivery Time:</span>
              <strong className="detail-val eta-val">⏱️ 30 – 35 Mins</strong>
            </div>

            <div className="order-detail-row">
              <span className="detail-label">Payment Method:</span>
              <span className="detail-val">{order.paymentMethod}</span>
            </div>

            <div className="order-detail-row">
              <span className="detail-label">Total Amount Paid:</span>
              <strong className="detail-val">₹{order.total.toLocaleString('en-IN')}</strong>
            </div>

            {/* Crazy4U Tokens Earned */}
            <div className="earned-tokens-banner">
              <span className="coin-emoji">🪙</span>
              <div>
                <strong>You earned {order.tokensEarned || Math.round(order.total * 0.1)} Crazy4U Tokens!</strong>
                <p>Tokens have been credited to your rewards wallet for future discounts.</p>
              </div>
            </div>

            <div className="cancellation-alert-pill">
              <span>⚠️ Need to change plans? You can cancel within <strong>5 minutes</strong> of placing.</span>
            </div>
          </div>
        )}

        <div className="confirmation-action-btns">
          <button
            className="btn-primary track-btn-primary"
            onClick={() => navigate('/orders')}
          >
            Track Order Live 🛵
          </button>
          <Link to="/menu" className="btn-secondary">
            Continue Shopping 🍕
          </Link>
        </div>
      </div>
    </div>
  );
}
