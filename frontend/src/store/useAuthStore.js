import { create } from 'zustand';

const AUTH_STORAGE_KEY = 'crazy4u_auth_user_v1';

const DEFAULT_USER = {
  id: 'usr_demo_77',
  name: 'Lohith Pahuja',
  email: 'lohith@example.com',
  phone: '+91 98765 43210',
  tokenBalance: 1250, // Starting Crazy4U Tokens
  addresses: [
    {
      id: 'addr_1',
      tag: 'Home',
      street: 'Flat 402, Sunshine Heights, Sector 14',
      city: 'Gurugram',
      pincode: '122001',
      isDefault: true
    },
    {
      id: 'addr_2',
      tag: 'Office',
      street: 'Cyber Tower B, 6th Floor, DLF Phase 2',
      city: 'Gurugram',
      pincode: '122002',
      isDefault: false
    }
  ]
};

const loadStoredUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_USER;
  } catch {
    return DEFAULT_USER;
  }
};

export const useAuthStore = create((set, get) => ({
  user: loadStoredUser(),
  isAuthenticated: true,

  // Login
  login: ({ email, password }) => {
    // Standard mock authentication for client state
    const loggedUser = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: email.split('@')[0] || DEFAULT_USER.name
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedUser));
    set({ user: loggedUser, isAuthenticated: true });
    return { success: true };
  },

  // Register
  register: ({ name, email, phone, password }) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      tokenBalance: 200, // 200 Welcome Bonus Tokens!
      addresses: [
        {
          id: `addr_${Date.now()}`,
          tag: 'Home',
          street: '123 Food Street, Green Park',
          city: 'New Delhi',
          pincode: '110016',
          isDefault: true
        }
      ]
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true });
    return { success: true };
  },

  // Logout
  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    set({ user: null, isAuthenticated: false });
  },

  // Update profile
  updateProfile: ({ name, email, phone }) => {
    const updated = { ...get().user, name, email, phone };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    set({ user: updated });
    return { success: true };
  },

  // Add tokens after successful order
  addTokens: (amount) => {
    if (!get().user) return;
    const current = get().user.tokenBalance || 0;
    const updated = { ...get().user, tokenBalance: current + amount };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    set({ user: updated });
  },

  // Deduct tokens when redeemed
  deductTokens: (amount) => {
    if (!get().user) return false;
    const current = get().user.tokenBalance || 0;
    if (current < amount) return false;
    const updated = { ...get().user, tokenBalance: current - amount };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    set({ user: updated });
    return true;
  },

  // Address Management
  addAddress: (newAddr) => {
    const addr = {
      id: `addr_${Date.now()}`,
      ...newAddr,
      isDefault: get().user?.addresses?.length === 0
    };
    const updatedAddresses = [...(get().user?.addresses || []), addr];
    const updated = { ...get().user, addresses: updatedAddresses };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    set({ user: updated });
  },

  deleteAddress: (id) => {
    const updatedAddresses = (get().user?.addresses || []).filter(a => a.id !== id);
    const updated = { ...get().user, addresses: updatedAddresses };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    set({ user: updated });
  },

  setDefaultAddress: (id) => {
    const updatedAddresses = (get().user?.addresses || []).map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    const updated = { ...get().user, addresses: updatedAddresses };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    set({ user: updated });
  }
}));
