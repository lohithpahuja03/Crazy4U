import React from 'react';
import './FoodCard.css';

export default function FoodCard({ food, onSelect, onQuickAdd }) {
  const hasVariants = (food.sizes && food.sizes.length > 1) || (food.addons && food.addons.length > 0);

  return (
    <div className="food-card crazy-card">
      {/* Top Media & Badges */}
      <div className="food-card-media" onClick={() => onSelect(food)}>
        <img src={food.image} alt={food.name} className="food-card-img" loading="lazy" />
        
        {/* Badges overlay */}
        <div className="food-card-badges-top">
          <span className={food.isVeg ? 'badge-veg' : 'badge-nonveg'} title={food.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}></span>
          
          {food.isBestseller && (
            <span className="badge-tag bestseller-tag">★ Bestseller</span>
          )}
          {food.discountBadge && (
            <span className="badge-tag discount-tag">{food.discountBadge}</span>
          )}
        </div>

        {/* Rating chip */}
        <div className="food-card-rating">
          <span className="star-icon">★</span>
          <span className="rating-value">{food.rating}</span>
          <span className="rating-count">({food.reviewsCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="food-card-body">
        <h4 className="food-card-title" onClick={() => onSelect(food)}>
          {food.name}
        </h4>
        <p className="food-card-desc">
          {food.description}
        </p>

        {/* Price & Action */}
        <div className="food-card-footer">
          <div className="food-price-wrap">
            <span className="current-price">₹{food.basePrice}</span>
            {food.originalPrice && (
              <span className="original-price">₹{food.originalPrice}</span>
            )}
          </div>

          <div className="food-action-wrap">
            {hasVariants ? (
              <button 
                className="btn-customise"
                onClick={() => onSelect(food)}
              >
                Customise <span>+</span>
              </button>
            ) : (
              <button 
                className="btn-quick-add"
                onClick={() => onQuickAdd(food)}
              >
                Add <span>+</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
