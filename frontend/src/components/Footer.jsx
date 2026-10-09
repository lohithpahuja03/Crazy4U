import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        {/* Brand column */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand">
            <span className="brand-icon">🍕</span>
            <span className="brand-text">
              Crazy<span className="brand-highlight">4U</span>
            </span>
          </Link>
          <p className="footer-tagline">
            Good Food. Good Mood. Crazy4U brings hand-tossed artisan pizzas, juicy burgers, crispy sides, and instant rewards straight to your doorstep.
          </p>

          <div className="footer-payments-wrap">
            <span className="payments-label">Supported Payments:</span>
            <div className="payment-badges-row">
              <span className="pay-badge">📱 Paytm</span>
              <span className="pay-badge">⚡ Google Pay</span>
              <span className="pay-badge">💵 Cash on Delivery</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links-col">
          <h5 className="footer-col-title">Navigation</h5>
          <ul className="footer-links-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Explore Menu</Link></li>
            <li><Link to="/offers">Promotional Offers</Link></li>
            <li><Link to="/orders">Order History</Link></li>
            <li><Link to="/profile">Crazy4U Tokens & Rewards</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-links-col">
          <h5 className="footer-col-title">Categories</h5>
          <ul className="footer-links-list">
            <li><Link to="/menu?category=pizza">Gourmet Pizzas</Link></li>
            <li><Link to="/menu?category=burger">Juicy Burgers</Link></li>
            <li><Link to="/menu?category=fastfood">Crispy Fries & Wings</Link></li>
            <li><Link to="/menu?category=combos">Value Combos</Link></li>
            <li><Link to="/menu?category=desserts">Choco Lava Cakes</Link></li>
          </ul>
        </div>

        {/* Why Crazy4U & Hours */}
        <div className="footer-links-col">
          <h5 className="footer-col-title">Why Crazy4U?</h5>
          <ul className="footer-perks-list">
            <li>🚀 30-Minute Lightning Delivery</li>
            <li>🌱 Fresh & Hygienic Ingredients</li>
            <li>🪙 10% Back in Crazy4U Tokens</li>
            <li>🎉 20% Off Wednesdays & Fridays</li>
            <li>🕒 Open 10:00 AM - 02:00 AM Daily</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright">
            © 2026 Crazy4U Food Ordering Platform. All rights reserved.
          </p>
          <p className="footer-built-with">
            Crafted with passion for authentic food lovers • Built for <a href="https://github.com/lohithpahuja03/Crazy4U" target="_blank" rel="noreferrer">github.com/lohithpahuja03/Crazy4U</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
