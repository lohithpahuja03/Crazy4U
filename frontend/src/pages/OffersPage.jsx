import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROMOTIONAL_OFFERS } from '../data/foodData';
import { useCartStore } from '../store/useCartStore';
import toast from 'react-hot-toast';
import './OffersPage.css';

export default function OffersPage() {
  const navigate = useNavigate();
  const applyCoupon = useCartStore((state) => state.applyCoupon);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    toast.success(`Coupon code "${code}" copied to clipboard! 📋`);
  };

  const handleApplyToCart = (code) => {
    const res = applyCoupon(code);
    if (res.success) {
      toast.success(res.message);
      navigate('/cart');
    } else {
      toast(res.message, { icon: 'ℹ️' });
      navigate('/cart');
    }
  };

  return (
    <div className="container offers-page-container">
      <div className="offers-header-center">
        <span className="offers-kicker">CRAZY4U PROMOTIONS & REWARDS</span>
        <h1 className="offers-title">Exclusive Deals & Offers</h1>
        <p className="offers-subtitle">
          Save big on your favorite pizzas, burgers, and party meals with our weekly deals and volume discounts.
        </p>
      </div>

      <div className="offers-cards-grid">
        {PROMOTIONAL_OFFERS.map((offer) => (
          <div key={offer.code} className="offer-card crazy-card">
            <div className="offer-card-top" style={{ background: offer.colorGradient }}>
              <span className="offer-badge-pill">{offer.badge}</span>
              <h3 className="offer-card-title">{offer.title}</h3>
              <p className="offer-card-sub">{offer.subtitle}</p>
            </div>

            <div className="offer-card-body">
              <p className="offer-desc-text">{offer.description}</p>

              <div className="offer-conditions-list">
                {offer.minOrderAmount > 0 ? (
                  <div className="condition-item">
                    <span>Min Order Value:</span>
                    <strong>₹{offer.minOrderAmount.toLocaleString('en-IN')}</strong>
                  </div>
                ) : (
                  <div className="condition-item">
                    <span>Min Order Value:</span>
                    <strong>No minimum amount</strong>
                  </div>
                )}
                {offer.validDays.length < 7 && (
                  <div className="condition-item">
                    <span>Valid On:</span>
                    <strong>Wednesdays & Fridays</strong>
                  </div>
                )}
              </div>

              <div className="offer-code-action-box">
                <div className="offer-code-display">
                  <span className="code-label">PROMO CODE:</span>
                  <strong className="code-val">{offer.code}</strong>
                </div>

                <div className="offer-btns-row">
                  <button
                    className="btn-secondary btn-sm"
                    onClick={() => handleCopyCode(offer.code)}
                  >
                    Copy Code 📋
                  </button>
                  <button
                    className="btn-primary btn-sm"
                    onClick={() => handleApplyToCart(offer.code)}
                  >
                    Apply & Go to Cart →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rewards FAQ / Callout */}
      <div className="offers-rewards-callout crazy-card">
        <div className="callout-icon">🪙</div>
        <div className="callout-text">
          <h3>Crazy4U Loyalty Tokens: Earn With Every Bite!</h3>
          <p>
            Don't have a coupon code? No worries! Every single delivered order automatically awards <strong>10% back in Crazy4U Tokens</strong> directly to your profile. Redeem 200 tokens anytime for instant ₹100 discount vouchers!
          </p>
        </div>
      </div>
    </div>
  );
}
