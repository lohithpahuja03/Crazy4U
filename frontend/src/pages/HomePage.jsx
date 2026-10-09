import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES, FOOD_ITEMS, PROMOTIONAL_OFFERS } from '../data/foodData';
import FoodCard from '../components/FoodCard';
import useScrollReveal from '../hooks/useScrollReveal';
import toast from 'react-hot-toast';
import './HomePage.css';

export default function HomePage({ onSelectItem, onQuickAdd }) {
  const navigate = useNavigate();
  useScrollReveal(); // Trigger scroll animation observer

  const bestSellers = FOOD_ITEMS.filter((item) => item.isBestseller).slice(0, 4);
  const crazyCombos = FOOD_ITEMS.filter((item) => item.category === 'combos').slice(0, 3);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    toast.success(`Coupon code "${code}" copied! Apply at checkout 🏷️`);
  };

  return (
    <div className="home-page-wrap">
      {/* 1. CINEMATIC HERO SECTION WITH 16:9 HERO PHOTO & LEFT THEME/TAGLINE */}
      <section className="hero-section">
        {/* Ambient background glow orbs */}
        <div className="hero-ambient-glow glow-left"></div>
        <div className="hero-ambient-glow glow-right"></div>

        <div className="container hero-container">
          {/* Left Column: Theme line, Tagline & Call-To-Action */}
          <div className="hero-content">
            <div className="hero-badge-wrap">
              <span className="badge-flame">🔥</span>
              <span className="badge-flame-text">FLAME-GRILLED & HAND-CRAFTED</span>
            </div>

            <h1 className="hero-title">
              GOOD FOOD.<br />
              GOOD MOOD.<br />
              <span className="hero-brand-name">CRAZY4U.</span>
            </h1>

            <p className="hero-tagline">
              "The Most Insanely Delicious Food Delivery in Town — Wood-Fired Sourdough Crusts, Melting Cheddar Smash Burgers, & Blazing 30-Min Drop."
            </p>

            <div className="hero-cta-group">
              <Link to="/menu" className="btn-primary hero-btn-primary">
                <span>Order Now 🍕</span>
              </Link>
              <Link to="/offers" className="btn-secondary hero-btn-secondary">
                <span>View Today's Offers 🏷️</span>
              </Link>
            </div>

            {/* Glassmorphic Stats Bar */}
            <div className="hero-glass-stats">
              <div className="stat-item">
                <span className="stat-number">30m</span>
                <span className="stat-label">Lightning Delivery</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">12,000+ Reviews</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">10%</span>
                <span className="stat-label">Tokens Cashback</span>
              </div>
            </div>
          </div>

          {/* Right Column: Real Big 16:9 Ratio Photo with Cinematic Frame & Glass Overlays */}
          <div className="hero-visual-col">
            <div className="hero-16-9-frame">
              <div className="hero-16-9-ratio">
                <img
                  src="/hero-feast.jpg"
                  alt="Crazy4U Gourmet Pizza and Burger Feast"
                  className="hero-cinematic-img"
                />

                {/* Ambient Red Rim Light on Image */}
                <div className="img-glow-overlay"></div>

                {/* Floating Glassmorphic Tag Chips */}
                <div className="hero-float-chip chip-top-left">
                  <span className="chip-icon">🍕</span>
                  <div className="chip-text">
                    <strong>Artisan Pepperoni & Burger</strong>
                    <span>Chef's Signature Blend</span>
                  </div>
                </div>

                <div className="hero-float-chip chip-bottom-right">
                  <span className="chip-icon">🪙</span>
                  <div className="chip-text">
                    <strong>+150 Crazy4U Tokens</strong>
                    <span>Instant reward on delivery</span>
                  </div>
                </div>

                {/* Rating badge */}
                <div className="hero-rating-badge">
                  <span className="star-glow">★</span>
                  <span>4.9 / 5.0 (Top Rated)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROMOTIONAL BANNERS SECTION (SCROLL REVEAL) */}
      <section className="promo-banners-section reveal-on-scroll">
        <div className="container">
          <div className="promo-grid">
            {/* Banner 1: Wednesday & Friday 20% OFF */}
            <div className="promo-banner-card midweek-banner">
              <div className="promo-shine"></div>
              <div className="promo-content">
                <span className="promo-badge">MIDWEEK SPECIAL</span>
                <h3 className="promo-heading">20% OFF EVERY WEDNESDAY & FRIDAY</h3>
                <p className="promo-info">Enjoy flat 20% off on all pizzas, burgers, and sides across the entire menu.</p>
                <div className="promo-actions">
                  <span className="code-pill">CODE: <strong>MIDWEEK20</strong></span>
                  <button className="btn-copy-code" onClick={() => handleCopyCode('MIDWEEK20')}>
                    Copy Code 📋
                  </button>
                </div>
              </div>
              <div className="promo-badge-tag">20% OFF</div>
            </div>

            {/* Banner 2: ₹3,999+ 25% OFF */}
            <div className="promo-banner-card feast-banner">
              <div className="promo-shine"></div>
              <div className="promo-content">
                <span className="promo-badge feast-badge">MEGA CELEBRATION</span>
                <h3 className="promo-heading">25% OFF ON ORDERS ABOVE ₹3,999</h3>
                <p className="promo-info">Planning a party or office feast? Unlock massive 25% instant savings!</p>
                <div className="promo-actions">
                  <span className="code-pill">CODE: <strong>FEAST25</strong></span>
                  <button className="btn-copy-code" onClick={() => handleCopyCode('FEAST25')}>
                    Copy Code 📋
                  </button>
                </div>
              </div>
              <div className="promo-badge-tag feast-tag">25% OFF</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES (SCROLL REVEAL STAGGERED) */}
      <section className="categories-section reveal-on-scroll">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="section-kicker">CURATED COLLECTIONS</span>
              <h2 className="section-title">Popular Food Categories</h2>
              <p className="section-subtitle">What are you craving today? Explore our artisanal collections.</p>
            </div>
            <Link to="/menu" className="view-all-link">
              View All Menu →
            </Link>
          </div>

          <div className="categories-grid">
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat, idx) => (
              <div
                key={cat.id}
                className={`category-pill-card reveal-on-scroll reveal-delay-${(idx % 4) + 1}`}
                onClick={() => navigate(`/menu?category=${cat.id}`)}
              >
                <div className="cat-icon-glow">{cat.icon}</div>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-hover-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS (SCROLL REVEAL) */}
      <section className="bestsellers-section reveal-on-scroll">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="section-kicker">CUSTOMER FAVORITES</span>
              <h2 className="section-title">Best Selling Dishes</h2>
              <p className="section-subtitle">Hand-crafted recipes loved by over 50,000 foodies.</p>
            </div>
            <Link to="/menu" className="view-all-link">
              See Full Menu →
            </Link>
          </div>

          <div className="food-grid">
            {bestSellers.map((food, idx) => (
              <div key={food.id} className={`reveal-on-scroll reveal-delay-${(idx % 4) + 1}`}>
                <FoodCard
                  food={food}
                  onSelect={onSelectItem}
                  onQuickAdd={onQuickAdd}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CRAZY4U COMBOS (SCROLL REVEAL) */}
      <section className="combos-section reveal-on-scroll">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="section-kicker">MAXIMUM VALUE</span>
              <h2 className="section-title">Crazy4U Value Combos</h2>
              <p className="section-subtitle">Complete meals engineered for pure satisfaction and great savings.</p>
            </div>
            <Link to="/menu?category=combos" className="view-all-link">
              View All Combos →
            </Link>
          </div>

          <div className="combos-grid">
            {crazyCombos.map((combo, idx) => (
              <div
                key={combo.id}
                className={`combo-card crazy-card reveal-on-scroll reveal-delay-${idx + 1}`}
                onClick={() => onSelectItem(combo)}
              >
                <div className="combo-img-wrap">
                  <img src={combo.image} alt={combo.name} className="combo-img" />
                  <span className="combo-discount-badge">{combo.discountBadge}</span>
                </div>
                <div className="combo-body">
                  <div className="combo-badge-row">
                    <span className={combo.isVeg ? 'badge-veg' : 'badge-nonveg'}></span>
                    <span className="combo-rating">★ {combo.rating}</span>
                  </div>
                  <h4 className="combo-title">{combo.name}</h4>
                  <p className="combo-desc">{combo.description}</p>
                  <div className="combo-footer">
                    <div>
                      <span className="combo-price">₹{combo.basePrice}</span>
                      <span className="combo-orig-price">₹{combo.originalPrice}</span>
                    </div>
                    <button className="btn-primary combo-add-btn">
                      Order Combo +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CRAZY4U? (SCROLL REVEAL WITH GLASS CARDS) */}
      <section className="why-section reveal-on-scroll">
        <div className="container">
          <div className="why-header">
            <span className="section-kicker">THE CRAZY4U PROMISE</span>
            <h2 className="section-title">Why Order With Us?</h2>
            <p className="section-subtitle">We don't just deliver food. We deliver unforgettable dining moments.</p>
          </div>

          <div className="perks-grid">
            <div className="perk-card crazy-card reveal-on-scroll reveal-delay-1">
              <div className="perk-icon-wrap">🚀</div>
              <h4>30-Min Fast Delivery</h4>
              <p>Hot, insulated, and sealed tamper-proof delivery right to your door with live simulated tracking.</p>
            </div>
            <div className="perk-card crazy-card reveal-on-scroll reveal-delay-2">
              <div className="perk-icon-wrap">🍕</div>
              <h4>Wood-Fired Crusts</h4>
              <p>100% real dairy mozzarella, freshly fermented dough, and hand-crushed Italian tomato base.</p>
            </div>
            <div className="perk-card crazy-card reveal-on-scroll reveal-delay-3">
              <div className="perk-icon-wrap">🪙</div>
              <h4>Crazy4U Reward Tokens</h4>
              <p>Earn 10% back in Crazy4U tokens after every delivered order. Redeem for instant food vouchers.</p>
            </div>
            <div className="perk-card crazy-card reveal-on-scroll reveal-delay-4">
              <div className="perk-icon-wrap">🔒</div>
              <h4>Secure Payments & COD</h4>
              <p>Pay smoothly via Paytm, Google Pay, or Cash on Delivery (available on orders between ₹599 and ₹4,999).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA CALLOUT BANNER (SCROLL REVEAL WITH RED GLOW) */}
      <section className="cta-callout-section reveal-on-scroll">
        <div className="container">
          <div className="cta-callout-card">
            <div className="cta-ambient-red-glow"></div>
            <div className="cta-callout-content">
              <h2 className="cta-callout-title">Ready for Your Next Delicious Feast?</h2>
              <p className="cta-callout-desc">
                Treat yourself, your friends, and your family today. Use code <strong>MIDWEEK20</strong> or order above ₹3,999 for massive savings!
              </p>
              <div className="cta-callout-btns">
                <Link to="/menu" className="btn-primary cta-btn">
                  Explore Full Menu 🍽️
                </Link>
                <Link to="/offers" className="btn-secondary cta-btn-glass">
                  See All Deals 🎁
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
