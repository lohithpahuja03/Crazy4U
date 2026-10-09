import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES, FOOD_ITEMS, PROMOTIONAL_OFFERS } from '../data/foodData';
import FoodCard from '../components/FoodCard';
import toast from 'react-hot-toast';
import './HomePage.css';

export default function HomePage({ onSelectItem, onQuickAdd }) {
  const navigate = useNavigate();

  const bestSellers = FOOD_ITEMS.filter((item) => item.isBestseller).slice(0, 4);
  const crazyCombos = FOOD_ITEMS.filter((item) => item.category === 'combos').slice(0, 3);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    toast.success(`Coupon code "${code}" copied! Apply at checkout 🏷️`);
  };

  return (
    <div className="home-page-wrap">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-flame">🔥</span>
              <span>Fastest Food Delivery in Town</span>
            </div>

            <h1 className="hero-title">
              GOOD FOOD.<br />
              GOOD MOOD.<br />
              <span className="hero-brand-name">CRAZY4U.</span>
            </h1>

            <p className="hero-desc">
              Satisfy your cravings with hand-crafted sourdough pizzas, gourmet smash burgers, golden sides, and mouth-watering desserts. Freshly made, delivered hot in 30 minutes!
            </p>

            <div className="hero-cta-group">
              <Link to="/menu" className="btn-primary hero-btn-primary">
                Order Now 🍕
              </Link>
              <Link to="/offers" className="btn-secondary hero-btn-secondary">
                View Today's Offers 🏷️
              </Link>
            </div>

            {/* Quick stats / perks */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <span className="stat-number">30m</span>
                <span className="stat-label">Fast Delivery</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">Customer Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">10%</span>
                <span className="stat-label">Tokens Cashback</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Media */}
          <div className="hero-visual">
            <div className="hero-visual-bg-glow"></div>
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop&q=80"
                alt="Crazy4U Gourmet Pizza"
                className="hero-main-img"
              />
              {/* Floating review card */}
              <div className="floating-card review-float">
                <span className="float-avatar">🍕</span>
                <div>
                  <div className="float-title">Cheese Burst Supreme</div>
                  <div className="float-rating">★★★★★ (4.9/5)</div>
                </div>
              </div>
              {/* Floating token card */}
              <div className="floating-card token-float">
                <span className="float-coin">🪙</span>
                <div>
                  <div className="float-title">+120 Crazy4U Tokens</div>
                  <div className="float-sub">Earned on delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROMOTIONAL BANNERS SECTION */}
      <section className="promo-banners-section">
        <div className="container">
          <div className="promo-grid">
            {/* Banner 1: Wednesday & Friday 20% OFF */}
            <div className="promo-banner-card midweek-banner">
              <div className="promo-content">
                <span className="promo-badge">MIDWEEK SPECIAL</span>
                <h3 className="promo-heading">20% OFF EVERY WEDNESDAY & FRIDAY</h3>
                <p className="promo-info">Enjoy flat 20% off on all pizzas, burgers, and sides across the entire menu.</p>
                <div className="promo-actions">
                  <span className="code-pill">CODE: <strong>MIDWEEK20</strong></span>
                  <button className="btn-copy-code" onClick={() => handleCopyCode('MIDWEEK20')}>
                    Copy Code
                  </button>
                </div>
              </div>
              <div className="promo-badge-tag">20% OFF</div>
            </div>

            {/* Banner 2: ₹3,999+ 25% OFF */}
            <div className="promo-banner-card feast-banner">
              <div className="promo-content">
                <span className="promo-badge feast-badge">MEGA CELEBRATION</span>
                <h3 className="promo-heading">25% OFF ON ORDERS ABOVE ₹3,999</h3>
                <p className="promo-info">Planning a party or office feast? Unlock massive 25% instant savings!</p>
                <div className="promo-actions">
                  <span className="code-pill">CODE: <strong>FEAST25</strong></span>
                  <button className="btn-copy-code" onClick={() => handleCopyCode('FEAST25')}>
                    Copy Code
                  </button>
                </div>
              </div>
              <div className="promo-badge-tag feast-tag">25% OFF</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <h2 className="section-title">Popular Categories</h2>
              <p className="section-subtitle">What are you craving today? Explore our top-rated collections.</p>
            </div>
            <Link to="/menu" className="view-all-link">
              View All Menu →
            </Link>
          </div>

          <div className="categories-grid">
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
              <div
                key={cat.id}
                className="category-pill-card"
                onClick={() => navigate(`/menu?category=${cat.id}`)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS */}
      <section className="bestsellers-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="section-kicker">CUSTOMER FAVORITES</span>
              <h2 className="section-title">Best Sellers</h2>
              <p className="section-subtitle">Our most ordered and highest rated dishes this week.</p>
            </div>
            <Link to="/menu" className="view-all-link">
              See Full Menu →
            </Link>
          </div>

          <div className="food-grid">
            {bestSellers.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onSelect={onSelectItem}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CRAZY4U COMBOS */}
      <section className="combos-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="section-kicker">MAXIMUM VALUE</span>
              <h2 className="section-title">Crazy4U Value Combos</h2>
              <p className="section-subtitle">Curated meal combinations offering maximum taste and savings.</p>
            </div>
            <Link to="/menu?category=combos" className="view-all-link">
              View All Combos →
            </Link>
          </div>

          <div className="combos-grid">
            {crazyCombos.map((combo) => (
              <div key={combo.id} className="combo-card" onClick={() => onSelectItem(combo)}>
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

      {/* 6. WHY CRAZY4U? */}
      <section className="why-section">
        <div className="container">
          <div className="why-header">
            <span className="section-kicker">THE CRAZY4U PROMISE</span>
            <h2 className="section-title">Why Order With Us?</h2>
            <p className="section-subtitle">We don't just deliver food. We deliver moments of pure joy.</p>
          </div>

          <div className="perks-grid">
            <div className="perk-card">
              <div className="perk-icon-wrap">🚀</div>
              <h4>30-Min Fast Delivery</h4>
              <p>Hot, fresh, and insulated delivery right to your door with real-time status tracking.</p>
            </div>
            <div className="perk-card">
              <div className="perk-icon-wrap">🍕</div>
              <h4>Authentic Fresh Ingredients</h4>
              <p>100% real dairy mozzarella, fresh farm veggies, and signature hand-kneaded dough.</p>
            </div>
            <div className="perk-card">
              <div className="perk-icon-wrap">🪙</div>
              <h4>Crazy4U Reward Tokens</h4>
              <p>Earn 10% back in Crazy4U tokens after every delivered order. Redeem for instant food discounts.</p>
            </div>
            <div className="perk-card">
              <div className="perk-icon-wrap">🔒</div>
              <h4>Safe & Easy Payments</h4>
              <p>Pay smoothly via Paytm, Google Pay, or Cash on Delivery (available on orders ₹599-₹4,999).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA CALLOUT BANNER */}
      <section className="cta-callout-section">
        <div className="container">
          <div className="cta-callout-card">
            <div className="cta-callout-content">
              <h2 className="cta-callout-title">Ready for Your Next Delicious Meal?</h2>
              <p className="cta-callout-desc">
                Treat yourself, your friends, and your family today. Use code <strong>MIDWEEK20</strong> or order above ₹3,999 for massive savings!
              </p>
              <div className="cta-callout-btns">
                <Link to="/menu" className="btn-primary cta-btn">
                  Explore Full Menu 🍽️
                </Link>
                <Link to="/offers" className="btn-secondary cta-btn-white">
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
