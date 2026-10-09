import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const api = {
  // Foods
  getFoods: async (params) => {
    try {
      const res = await apiClient.get('/foods', { params });
      return res.data;
    } catch (err) {
      console.warn('Backend API unavailable, using local catalogue fallback', err.message);
      return null;
    }
  },

  getFoodById: async (id) => {
    try {
      const res = await apiClient.get(`/foods/${id}`);
      return res.data;
    } catch {
      return null;
    }
  },

  // Offers
  getOffers: async () => {
    try {
      const res = await apiClient.get('/offers');
      return res.data;
    } catch {
      return null;
    }
  },

  validateCoupon: async (code, subtotal) => {
    try {
      const res = await apiClient.post('/offers/validate', { code, subtotal });
      return res.data;
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to validate coupon on server' 
      };
    }
  },

  // Orders
  createOrder: async (orderPayload) => {
    try {
      const res = await apiClient.post('/orders', orderPayload);
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error processing order'
      };
    }
  },

  cancelOrder: async (orderId) => {
    try {
      const res = await apiClient.post(`/orders/${orderId}/cancel`);
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error cancelling order'
      };
    }
  },

  // Tokens
  getTokenBalance: async () => {
    try {
      const res = await apiClient.get('/tokens/balance');
      return res.data;
    } catch {
      return null;
    }
  }
};

export default api;
