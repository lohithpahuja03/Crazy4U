import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Styling
import './styles/designSystem.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import OrderPackedModal from './components/OrderPackedModal';
import AuthModal from './components/AuthModal';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ProfilePage from './pages/ProfilePage';
import OffersPage from './pages/OffersPage';

// Stores
import { useCartStore } from './store/useCartStore';
import { useOrderStore } from './store/useOrderStore';
import toast from 'react-hot-toast';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainApp() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { showPackedPopup, setShowPackedPopup, activeOrderId, orders } = useOrderStore();

  const handleQuickAdd = (food) => {
    addItem({
      id: food.id,
      name: food.name,
      image: food.image,
      category: food.category,
      isVeg: food.isVeg,
      unitPrice: food.basePrice,
      quantity: 1
    });
    toast.success(`Added ${food.name} to cart! 🍕`, {
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
  };

  return (
    <div className="crazy4u-app-root">
      <ScrollToTop />
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />

      {/* Global Navigation */}
      <Navbar
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSelectItem={(item) => setSelectedFood(item)}
      />

      {/* Application Routing */}
      <main className="crazy4u-main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSelectItem={(food) => setSelectedFood(food)}
                onQuickAdd={handleQuickAdd}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <MenuPage
                onSelectItem={(food) => setSelectedFood(food)}
                onQuickAdd={handleQuickAdd}
              />
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/orders" element={<OrderTrackingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route
            path="*"
            element={
              <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', color: 'var(--primary-red)' }}>404</h1>
                <h2>Page Not Found</h2>
                <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>The food route you are looking for does not exist.</p>
                <a href="/" className="btn-primary">Return Home 🍕</a>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Product Customisation Modal */}
      {selectedFood && (
        <ProductModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}

      {/* Order Packed Animated Popup (Section 25) */}
      <OrderPackedModal
        isOpen={showPackedPopup}
        onClose={() => setShowPackedPopup(false)}
        orderId={activeOrderId || orders[0]?.id}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}
