import React, { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import toast from 'react-hot-toast';
import './ProductModal.css';

export default function ProductModal({ food, onClose }) {
  const addItem = useCartStore((state) => state.addItem);

  // States
  const [selectedSize, setSelectedSize] = useState(food?.sizes?.[0] || null);
  const [selectedCrust, setSelectedCrust] = useState(food?.crusts?.[0] || null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Reset when food changes
  useEffect(() => {
    if (food) {
      setSelectedSize(food.sizes?.[0] || null);
      setSelectedCrust(food.crusts?.[0] || null);
      setSelectedAddons([]);
      setQuantity(1);
    }
  }, [food]);

  if (!food) return null;

  // Calculate live dynamic price
  const baseSizePrice = selectedSize ? selectedSize.price : food.basePrice;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = baseSizePrice + addonsTotal;
  const totalPrice = unitPrice * quantity;

  // Toggle addon
  const handleToggleAddon = (addon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: food.id,
      name: food.name,
      image: food.image,
      category: food.category,
      isVeg: food.isVeg,
      size: selectedSize ? selectedSize.name : null,
      crust: selectedCrust,
      addons: selectedAddons,
      unitPrice,
      quantity
    });

    toast.success(`Added ${quantity}x ${food.name} to cart! 🍕`, {
      style: {
        border: '1px solid #e22525',
        padding: '12px 16px',
        color: '#18181b',
        fontWeight: '600'
      },
      iconTheme: {
        primary: '#e22525',
        secondary: '#fff'
      }
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Hero image with badge */}
        <div className="modal-header-media">
          <img src={food.image} alt={food.name} className="modal-img" />
          <div className="modal-media-badges">
            <span className={food.isVeg ? 'badge-veg' : 'badge-nonveg'}></span>
            {food.discountBadge && (
              <span className="badge-tag discount-tag">{food.discountBadge}</span>
            )}
          </div>
        </div>

        {/* Modal Info Body */}
        <div className="modal-body-scroll">
          <div className="modal-intro">
            <h3 className="modal-title">{food.name}</h3>
            <p className="modal-desc">{food.description}</p>
            <div className="modal-rating">
              <span className="star-icon">★</span>
              <strong>{food.rating}</strong>
              <span className="rating-count">({food.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Size Selection */}
          {food.sizes && food.sizes.length > 0 && (
            <div className="customisation-section">
              <div className="section-label">
                <span>Select Size</span>
                <span className="required-tag">Required</span>
              </div>
              <div className="size-options-grid">
                {food.sizes.map((sizeOption, idx) => (
                  <label
                    key={idx}
                    className={`size-card-option ${selectedSize?.name === sizeOption.name ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(sizeOption)}
                  >
                    <input
                      type="radio"
                      name="size"
                      checked={selectedSize?.name === sizeOption.name}
                      onChange={() => setSelectedSize(sizeOption)}
                    />
                    <div className="size-label-text">{sizeOption.name}</div>
                    <div className="size-price-text">₹{sizeOption.price}</div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Crust / Style selection */}
          {food.crusts && food.crusts.length > 0 && (
            <div className="customisation-section">
              <div className="section-label">
                <span>Choice of Crust / Style</span>
                <span className="optional-tag">Included</span>
              </div>
              <div className="crust-options-list">
                {food.crusts.map((crust, idx) => (
                  <label
                    key={idx}
                    className={`crust-option-row ${selectedCrust === crust ? 'selected' : ''}`}
                    onClick={() => setSelectedCrust(crust)}
                  >
                    <input
                      type="radio"
                      name="crust"
                      checked={selectedCrust === crust}
                      onChange={() => setSelectedCrust(crust)}
                    />
                    <span>{crust}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Extra Addons */}
          {food.addons && food.addons.length > 0 && (
            <div className="customisation-section">
              <div className="section-label">
                <span>Add Extra Toppings & Dips</span>
                <span className="optional-tag">Optional</span>
              </div>
              <div className="addons-list">
                {food.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`addon-option-row ${isChecked ? 'selected' : ''}`}
                      onClick={() => handleToggleAddon(addon)}
                    >
                      <div className="addon-left">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleAddon(addon)}
                        />
                        <span>{addon.name}</span>
                      </div>
                      <span className="addon-price">+₹{addon.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action */}
        <div className="modal-sticky-footer">
          <div className="quantity-stepper">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="stepper-val">{quantity}</span>
            <button
              type="button"
              className="stepper-btn"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <button className="btn-add-modal-cart" onClick={handleAddToCart}>
            <span>Add to Cart</span>
            <span className="btn-price-divider">•</span>
            <span className="btn-total-val">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
