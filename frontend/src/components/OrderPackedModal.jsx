import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderPackedModal.css';

export default function OrderPackedModal({ isOpen, onClose, orderId }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleTrackClick = () => {
    onClose();
    navigate('/orders');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content packed-popup-card" onClick={(e) => e.stopPropagation()}>
        {/* Animated Celebration Icon */}
        <div className="packed-icon-wrapper">
          <div className="packed-pulse-circle"></div>
          <div className="packed-emoji">🍔📦</div>
          <div className="packed-scooter-badge">🛵💨</div>
        </div>

        <h3 className="packed-title">Your order is packed! 🎉</h3>
        <p className="packed-subtitle">
          It's freshly prepared, sealed, and on the way to your doorstep.
        </p>

        {orderId && (
          <div className="packed-order-chip">
            Order ID: <strong>{orderId}</strong>
          </div>
        )}

        <div className="packed-action-btns">
          <button className="btn-primary packed-track-btn" onClick={handleTrackClick}>
            TRACK ORDER 🛵
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
