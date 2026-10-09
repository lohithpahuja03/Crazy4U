import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, FOOD_ITEMS } from '../data/foodData';
import FoodCard from '../components/FoodCard';
import './MenuPage.css';

export default function MenuPage({ onSelectItem, onQuickAdd }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Query params
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  // Sync state if URL search params change
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (!val.trim()) {
      newParams.delete('search');
    } else {
      newParams.set('search', val.trim());
    }
    setSearchParams(newParams);
  };

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    let result = [...FOOD_ITEMS];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Veg / Non-veg filter
    if (vegOnly) {
      result = result.filter((item) => item.isVeg);
    } else if (nonVegOnly) {
      result = result.filter((item) => !item.isVeg);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Popularity default
      result.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }

    return result;
  }, [selectedCategory, vegOnly, nonVegOnly, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setVegOnly(false);
    setNonVegOnly(false);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="menu-page-wrap">
      {/* Menu Header Banner */}
      <section className="menu-header-banner">
        <div className="container">
          <h1 className="menu-header-title">Crazy4U Food Catalogue</h1>
          <p className="menu-header-subtitle">
            Explore our artisanal handcrafted pizzas, burgers, fries, shakes, and signature combos.
          </p>

          {/* Search bar inside header */}
          <div className="menu-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search dishes by name, toppings, or cuisine..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => handleSearchChange({ target: { value: '' } })}
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="container menu-main-layout">
        {/* Category Horizontal Filter Pills */}
        <div className="category-scroll-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`cat-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              <span className="pill-icon">{cat.icon}</span>
              <span className="pill-name">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Secondary Filter Bar (Veg / Non-veg & Sorting) */}
        <div className="menu-filter-toolbar">
          <div className="dietary-filter-group">
            <button
              className={`diet-btn ${vegOnly ? 'active-veg' : ''}`}
              onClick={() => {
                setVegOnly(!vegOnly);
                if (!vegOnly) setNonVegOnly(false);
              }}
            >
              <span className="badge-veg"></span> Pure Veg
            </button>
            <button
              className={`diet-btn ${nonVegOnly ? 'active-nonveg' : ''}`}
              onClick={() => {
                setNonVegOnly(!nonVegOnly);
                if (!nonVegOnly) setVegOnly(false);
              }}
            >
              <span className="badge-nonveg"></span> Non-Veg
            </button>
            {(vegOnly || nonVegOnly || searchQuery || selectedCategory !== 'all') && (
              <button className="reset-filter-btn" onClick={clearAllFilters}>
                Reset Filters ✕
              </button>
            )}
          </div>

          <div className="sort-filter-group">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated (★)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Food Items Results Count */}
        <div className="results-count-bar">
          <span>Showing <strong>{filteredItems.length}</strong> delicious items</span>
          {searchQuery && (
            <span className="query-tag">for "{searchQuery}"</span>
          )}
        </div>

        {/* Food Grid / Empty State */}
        {filteredItems.length > 0 ? (
          <div className="food-grid">
            {filteredItems.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onSelect={onSelectItem}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="empty-search-state crazy-card">
            <div className="empty-search-emoji">🍕🔍</div>
            <h3>We couldn't find that food.</h3>
            <p>No dishes matched your current search and dietary filter criteria.</p>
            <button className="btn-primary" onClick={clearAllFilters}>
              Explore Popular Items 🍽️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
