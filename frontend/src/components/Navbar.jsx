import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { FOOD_ITEMS } from '../data/foodData';
import './Navbar.css';

export default function Navbar({ onOpenAuth, onSelectItem }) {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const { user, isAuthenticated } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  // Live search filtering
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = FOOD_ITEMS.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Click outside to dismiss search suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectSuggestion = (item) => {
    setShowSuggestions(false);
    setSearchQuery('');
    if (onSelectItem) {
      onSelectItem(item);
    } else {
      navigate(`/menu?search=${encodeURIComponent(item.name)}`);
    }
  };

  return (
    <>
      <header className="navbar-wrapper">
        <div className="navbar-container container">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">🍕</span>
            <span className="brand-text">
              Crazy<span className="brand-highlight">4U</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="navbar-nav desktop-nav">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/menu" className={`nav-link ${location.pathname === '/menu' ? 'active' : ''}`}>
              Menu
            </Link>
            <Link to="/offers" className={`nav-link ${location.pathname === '/offers' ? 'active' : ''}`}>
              <span className="offer-tag-icon">🏷️</span> Offers
            </Link>
            <Link to="/orders" className={`nav-link ${location.pathname === '/orders' ? 'active' : ''}`}>
              Orders
            </Link>
          </nav>

          {/* Prominent Search Bar */}
          <div className="navbar-search" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search pizza, burger, fries, combos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </form>

            {/* Live Search Suggestions Dropdown */}
            {showSuggestions && (
              <div className="search-suggestions-dropdown">
                {suggestions.length > 0 ? (
                  <>
                    <div className="suggestions-header">Quick Results</div>
                    {suggestions.map((item) => (
                      <div
                        key={item.id}
                        className="suggestion-item"
                        onClick={() => handleSelectSuggestion(item)}
                      >
                        <img src={item.image} alt={item.name} className="suggestion-img" />
                        <div className="suggestion-info">
                          <div className="suggestion-name">
                            <span className={item.isVeg ? 'badge-veg' : 'badge-nonveg'} style={{ display: 'inline-block', marginRight: '6px', transform: 'scale(0.8)' }}></span>
                            {item.name}
                          </div>
                          <div className="suggestion-meta">
                            <span className="suggestion-cat">{item.category.toUpperCase()}</span>
                            <span className="suggestion-price">₹{item.basePrice}</span>
                          </div>
                        </div>
                        <span className="suggestion-arrow">→</span>
                      </div>
                    ))}
                    <div
                      className="suggestions-footer"
                      onClick={handleSearchSubmit}
                    >
                      View all results for "{searchQuery}"
                    </div>
                  </>
                ) : (
                  <div className="no-suggestions">
                    <span>No dishes found for "{searchQuery}"</span>
                    <button
                      className="view-menu-btn"
                      onClick={() => {
                        setShowSuggestions(false);
                        navigate('/menu');
                      }}
                    >
                      Explore Menu
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons & Badges */}
          <div className="navbar-actions">
            {/* Theme Toggle Button */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              <span className="theme-toggle-icon">
                {theme === 'dark' ? '☀️' : '🌙'}
              </span>
              <span className="theme-toggle-label">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>

            {/* Tokens Balance Badge (When Logged In) */}
            {isAuthenticated && user && (
              <Link to="/profile" className="token-badge-nav" title="Your Crazy4U Token Balance">
                <span className="token-coin">🪙</span>
                <span className="token-val">{(user.tokenBalance || 0).toLocaleString()}</span>
                <span className="token-lbl">Tokens</span>
              </Link>
            )}

            {/* Cart Button */}
            <Link to="/cart" className="cart-nav-btn" aria-label="Cart">
              <span className="cart-icon">🛒</span>
              <span className="cart-text">Cart</span>
              {cartItemCount > 0 && (
                <span className="cart-badge-count">{cartItemCount}</span>
              )}
            </Link>

            {/* User Profile / Login */}
            {isAuthenticated && user ? (
              <Link to="/profile" className="user-profile-btn">
                <div className="user-avatar-initial">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name-short">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <button className="login-nav-btn" onClick={onOpenAuth}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar for App-like experience */}
      <div className="mobile-bottom-nav">
        <Link to="/" className={`mobile-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="mobile-nav-icon">🏠</span>
          <span className="mobile-nav-label">Home</span>
        </Link>
        <Link to="/menu" className={`mobile-nav-item ${location.pathname === '/menu' ? 'active' : ''}`}>
          <span className="mobile-nav-icon">🍽️</span>
          <span className="mobile-nav-label">Menu</span>
        </Link>
        <Link to="/cart" className={`mobile-nav-item cart-item ${location.pathname === '/cart' ? 'active' : ''}`}>
          <div className="mobile-cart-badge-wrap">
            <span className="mobile-nav-icon">🛒</span>
            {cartItemCount > 0 && (
              <span className="mobile-cart-badge">{cartItemCount}</span>
            )}
          </div>
          <span className="mobile-nav-label">Cart</span>
        </Link>
        <Link to="/orders" className={`mobile-nav-item ${location.pathname === '/orders' ? 'active' : ''}`}>
          <span className="mobile-nav-icon">📦</span>
          <span className="mobile-nav-label">Orders</span>
        </Link>
        <Link to="/profile" className={`mobile-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
          <span className="mobile-nav-icon">👤</span>
          <span className="mobile-nav-label">Profile</span>
        </Link>
      </div>
    </>
  );
}
