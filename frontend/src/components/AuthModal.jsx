import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill in all required fields');
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        setLoading(false);
        return;
      }

      const res = register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      if (res.success) {
        toast.success('Welcome to Crazy4U! 🎉 200 Bonus Tokens credited!');
        onClose();
      }
    } else {
      if (!formData.email || !formData.password) {
        toast.error('Please enter email and password');
        setLoading(false);
        return;
      }

      const res = login({
        email: formData.email,
        password: formData.password
      });

      if (res.success) {
        toast.success('Logged in successfully!');
        onClose();
      }
    }
    setLoading(false);
  };

  const handleQuickDemoLogin = () => {
    login({ email: 'lohith@example.com', password: 'password123' });
    toast.success('Logged in as Demo User with 1,250 Tokens! 🍕');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>✕</button>

        <div className="auth-header">
          <div className="auth-logo-icon">🍕</div>
          <h3 className="auth-title">
            {isSignUp ? 'Create your Crazy4U Account' : 'Welcome back to Crazy4U'}
          </h3>
          <p className="auth-subtitle">
            {isSignUp
              ? 'Join today and get 200 Free Crazy4U Reward Tokens!'
              : 'Sign in to order your favourite pizzas, burgers & earn tokens.'}
          </p>
        </div>

        {/* Demo Fast Login Helper */}
        <div className="demo-login-box">
          <button type="button" className="demo-login-btn" onClick={handleQuickDemoLogin}>
            ⚡ One-Click Instant Demo Login (1,250 Tokens)
          </button>
        </div>

        <div className="auth-divider">
          <span>OR CONTINUE WITH CREDENTIALS</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. foodlover@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label>Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn-primary auth-submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : isSignUp ? 'Create Account & Claim Tokens' : 'Sign In to Account'}
          </button>
        </form>

        <div className="auth-toggle-footer">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button type="button" className="auth-switch-link" onClick={() => setIsSignUp(false)}>
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button type="button" className="auth-switch-link" onClick={() => setIsSignUp(true)}>
                Sign Up for Free
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
