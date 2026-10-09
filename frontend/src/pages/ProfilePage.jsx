import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useOrderStore } from '../store/useOrderStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateProfile, addAddress, deleteAddress, logout, deductTokens } = useAuthStore();
  const { orders } = useOrderStore();

  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [activeTab, setActiveTab] = useState('tokens'); // 'tokens', 'addresses', 'orders'
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({ tag: 'Home', street: '', city: 'Gurugram', pincode: '122001' });

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h3>Please Sign In</h3>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>Log in to view your profile and Crazy4U token balance.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Go to Home
        </button>
      </div>
    );
  }

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.street) {
      toast.error('Please enter street address');
      return;
    }
    addAddress(newAddr);
    setShowAddAddr(false);
    toast.success('New address added!');
  };

  const handleRedeemTokens = () => {
    if ((user.tokenBalance || 0) < 200) {
      toast.error('You need at least 200 tokens to redeem a discount reward');
      return;
    }
    const success = deductTokens(200);
    if (success) {
      toast.success('Redeemed 200 Tokens for a ₹100 Crazy4U discount voucher! Code: REWARD100', {
        duration: 6000
      });
    }
  };

  return (
    <div className="container profile-page-container">
      {/* Profile Header Card */}
      <div className="profile-hero-card crazy-card">
        <div className="profile-user-left">
          <div className="profile-avatar-circle">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-contact-info">{user.email} • {user.phone}</p>
          </div>
        </div>

        <div className="profile-header-actions">
          <button
            className="btn-secondary btn-sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile ✏️'}
          </button>
          <button
            className="btn-logout"
            onClick={() => {
              logout();
              navigate('/');
              toast.success('Logged out successfully');
            }}
          >
            Sign Out 🚪
          </button>
        </div>
      </div>

      {/* Inline Profile Edit Form */}
      {isEditing && (
        <form onSubmit={handleProfileSave} className="edit-profile-card crazy-card">
          <h4>Edit Personal Information</h4>
          <div className="edit-form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
            Save Changes
          </button>
        </form>
      )}

      {/* Tabs Menu */}
      <div className="profile-tabs-nav">
        <button
          className={`tab-link ${activeTab === 'tokens' ? 'active' : ''}`}
          onClick={() => setActiveTab('tokens')}
        >
          🪙 Crazy4U Tokens ({user.tokenBalance?.toLocaleString() || 0})
        </button>
        <button
          className={`tab-link ${activeTab === 'addresses' ? 'active' : ''}`}
          onClick={() => setActiveTab('addresses')}
        >
          📍 Saved Addresses ({user.addresses?.length || 0})
        </button>
        <button
          className={`tab-link ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📦 Order History ({orders.length})
        </button>
      </div>

      {/* TAB 1: CRAZY4U TOKEN REWARD SYSTEM (Section 28) */}
      {activeTab === 'tokens' && (
        <div className="tokens-tab-layout">
          {/* Main Tokens Display Card */}
          <div className="token-balance-card crazy-card">
            <div className="token-balance-top">
              <div>
                <span className="token-kicker">AVAILABLE REWARD BALANCE</span>
                <h1 className="token-big-count">
                  🪙 {(user.tokenBalance || 0).toLocaleString()}
                  <span className="token-unit">Tokens</span>
                </h1>
              </div>
              <button className="btn-primary redeem-btn" onClick={handleRedeemTokens}>
                Redeem 200 Tokens for ₹100 Off 🎁
              </button>
            </div>

            <p className="token-conversion-explainer">
              💡 <strong>Crazy4U Rewards Rule:</strong> You automatically earn <strong>10% back in Tokens</strong> (1 Token for every ₹10 spent) on every successfully delivered order. Cancelled orders do not award tokens.
            </p>
          </div>

          {/* How Tokens Work */}
          <div className="tokens-perks-grid">
            <div className="token-feature-card crazy-card">
              <span className="feature-icon">🛍️</span>
              <h4>Order & Earn</h4>
              <p>Place orders for any pizzas, burgers, or combos. Tokens are credited as soon as food is delivered.</p>
            </div>
            <div className="feature-icon-card crazy-card">
              <span className="feature-icon">🏷️</span>
              <h4>Redeem for Discounts</h4>
              <p>Exchange 200 tokens for instant ₹100 vouchers directly applicable in your cart.</p>
            </div>
            <div className="feature-icon-card crazy-card">
              <span className="feature-icon">🛡️</span>
              <h4>Never Expire</h4>
              <p>Your Crazy4U tokens stay in your account forever. Accumulate for grand party celebrations!</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="addresses-tab-wrap">
          <div className="addr-tab-header">
            <h3>Manage Delivery Locations</h3>
            <button className="btn-secondary" onClick={() => setShowAddAddr(!showAddAddr)}>
              {showAddAddr ? 'Cancel' : '+ Add Address'}
            </button>
          </div>

          {showAddAddr && (
            <form onSubmit={handleAddAddress} className="add-addr-card crazy-card">
              <h4>Add New Address</h4>
              <div className="edit-form-grid">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={newAddr.tag}
                    onChange={(e) => setNewAddr({ ...newAddr, tag: e.target.value })}
                  >
                    <option value="Home">Home 🏠</option>
                    <option value="Office">Office 🏢</option>
                    <option value="Other">Other 📍</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    placeholder="House, building, street..."
                    value={newAddr.street}
                    onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                Save Location
              </button>
            </form>
          )}

          <div className="addresses-display-grid">
            {(user.addresses || []).map((addr) => (
              <div key={addr.id} className="address-display-card crazy-card">
                <div className="addr-card-top">
                  <span className="addr-tag-pill">{addr.tag}</span>
                  <button
                    className="delete-addr-btn"
                    onClick={() => deleteAddress(addr.id)}
                    title="Delete address"
                  >
                    ✕
                  </button>
                </div>
                <p className="addr-full-street">{addr.street}</p>
                <span className="addr-pincode-label">{addr.city} - {addr.pincode}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="profile-orders-wrap">
          <div className="orders-history-list">
            {orders.map((ord) => (
              <div key={ord.id} className="history-order-card crazy-card">
                <div className="history-top-row">
                  <div>
                    <strong className="history-id">{ord.id}</strong>
                    <span className="history-date">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`history-status-badge ${ord.status === 'Cancelled' ? 'cancelled' : 'delivered'}`}>
                    {ord.status}
                  </span>
                </div>

                <div className="history-items-summary">
                  {ord.items.map((it, idx) => (
                    <span key={idx} className="history-item-pill">
                      {it.quantity}x {it.name}
                    </span>
                  ))}
                </div>

                <div className="history-bottom-row">
                  <div>
                    <span>Paid:</span> <strong>₹{ord.total}</strong> via {ord.paymentMethod}
                  </div>
                  <button
                    className="btn-secondary btn-sm"
                    onClick={() => navigate('/orders')}
                  >
                    Track Status 🛵
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
