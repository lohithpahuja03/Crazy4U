import { create } from 'zustand';

const THEME_STORAGE_KEY = 'crazy4u_app_theme_session';

// Always default to 'dark' whenever the website is opened
const getInitialTheme = () => {
  try {
    const saved = sessionStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' ? 'light' : 'dark'; // Always dark by default
  } catch {
    return 'dark';
  }
};

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),

  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    try {
      sessionStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', nextTheme);
    }
    set({ theme: nextTheme });
  },

  setTheme: (theme) => {
    try {
      sessionStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    set({ theme });
  }
}));

// Apply initial dark theme attribute immediately on load
if (typeof document !== 'undefined') {
  const initial = getInitialTheme();
  document.documentElement.setAttribute('data-theme', initial);
}

export default useThemeStore;
