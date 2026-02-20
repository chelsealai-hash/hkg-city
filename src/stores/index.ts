import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LanguageCode } from '@/i18n';
import type { Category, Listing, Announcement, Banner } from '@/types';

// Auth Store
interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; username: string; email: string; role: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (username: string, password: string) => {
        // Demo login - in production, this would call an API
        if (username === 'admin' && password === 'admin123') {
          set({
            isAuthenticated: true,
            user: { id: '1', username: 'admin', email: 'admin@hkg.city', role: 'admin' },
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Language Store
interface LanguageState {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'en',
      setLanguage: (lang) => set({ currentLanguage: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);

// Search Store
interface SearchState {
  query: string;
  results: Listing[];
  isSearching: boolean;
  setQuery: (query: string) => void;
  setResults: (results: Listing[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  results: [],
  isSearching: false,
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setIsSearching: (isSearching) => set({ isSearching }),
  clearSearch: () => set({ query: '', results: [], isSearching: false }),
}));

// Filter Store
interface FilterState {
  category: string | null;
  region: string | null;
  subRegion: string | null;
  filters: Record<string, string>;
  sortBy: string;
  setCategory: (category: string | null) => void;
  setRegion: (region: string | null) => void;
  setSubRegion: (subRegion: string | null) => void;
  setFilter: (key: string, value: string) => void;
  setSortBy: (sortBy: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: null,
  region: null,
  subRegion: null,
  filters: {},
  sortBy: 'default',
  setCategory: (category) => set({ category, region: null, subRegion: null, filters: {} }),
  setRegion: (region) => set({ region, subRegion: null }),
  setSubRegion: (subRegion) => set({ subRegion }),
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value },
  })),
  setSortBy: (sortBy) => set({ sortBy }),
  clearFilters: () => set({ category: null, region: null, subRegion: null, filters: {}, sortBy: 'default' }),
}));

// CMS Store
interface CMSState {
  categories: Category[];
  listings: Listing[];
  announcements: Announcement[];
  banners: Banner[];
  setCategories: (categories: Category[]) => void;
  setListings: (listings: Listing[]) => void;
  addListing: (listing: Listing) => void;
  updateListing: (id: string, listing: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  addAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  addBanner: (banner: Banner) => void;
  updateBanner: (id: string, banner: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;
}

// Load initial data from localStorage or use defaults
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(`cms-${key}`);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const useCMSStore = create<CMSState>()(
  persist(
    (set, get) => ({
      categories: [],
      listings: loadFromStorage('listings', []),
      announcements: loadFromStorage('announcements', []),
      banners: loadFromStorage('banners', []),
      setCategories: (categories) => set({ categories }),
      setListings: (listings) => {
        set({ listings });
        localStorage.setItem('cms-listings', JSON.stringify(listings));
      },
      addListing: (listing) => {
        const newListings = [...get().listings, listing];
        set({ listings: newListings });
        localStorage.setItem('cms-listings', JSON.stringify(newListings));
      },
      updateListing: (id, listing) => {
        const newListings = get().listings.map((l) => (l.id === id ? { ...l, ...listing } : l));
        set({ listings: newListings });
        localStorage.setItem('cms-listings', JSON.stringify(newListings));
      },
      deleteListing: (id) => {
        const newListings = get().listings.filter((l) => l.id !== id);
        set({ listings: newListings });
        localStorage.setItem('cms-listings', JSON.stringify(newListings));
      },
      addAnnouncement: (announcement) => {
        const newAnnouncements = [...get().announcements, announcement];
        set({ announcements: newAnnouncements });
        localStorage.setItem('cms-announcements', JSON.stringify(newAnnouncements));
      },
      updateAnnouncement: (id, announcement) => {
        const newAnnouncements = get().announcements.map((a) => (a.id === id ? { ...a, ...announcement } : a));
        set({ announcements: newAnnouncements });
        localStorage.setItem('cms-announcements', JSON.stringify(newAnnouncements));
      },
      deleteAnnouncement: (id) => {
        const newAnnouncements = get().announcements.filter((a) => a.id !== id);
        set({ announcements: newAnnouncements });
        localStorage.setItem('cms-announcements', JSON.stringify(newAnnouncements));
      },
      addBanner: (banner) => {
        const newBanners = [...get().banners, banner];
        set({ banners: newBanners });
        localStorage.setItem('cms-banners', JSON.stringify(newBanners));
      },
      updateBanner: (id, banner) => {
        const newBanners = get().banners.map((b) => (b.id === id ? { ...b, ...banner } : b));
        set({ banners: newBanners });
        localStorage.setItem('cms-banners', JSON.stringify(newBanners));
      },
      deleteBanner: (id) => {
        const newBanners = get().banners.filter((b) => b.id !== id);
        set({ banners: newBanners });
        localStorage.setItem('cms-banners', JSON.stringify(newBanners));
      },
    }),
    {
      name: 'cms-storage',
    }
  )
);

// Traffic Stats Store
interface TrafficStatsState {
  pageViews: number;
  uniqueVisitors: number;
  todayViews: number;
  incrementPageView: () => void;
  incrementUniqueVisitor: () => void;
}

export const useTrafficStatsStore = create<TrafficStatsState>()(
  persist(
    (set) => ({
      pageViews: 0,
      uniqueVisitors: 0,
      todayViews: 0,
      incrementPageView: () => set((state) => ({ pageViews: state.pageViews + 1 })),
      incrementUniqueVisitor: () => set((state) => ({ uniqueVisitors: state.uniqueVisitors + 1 })),
    }),
    {
      name: 'traffic-stats-storage',
    }
  )
);

// UI Store
interface UIState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  scrollY: number;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setSearchOpen: (isOpen: boolean) => void;
  setScrollY: (y: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  scrollY: 0,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  setScrollY: (y) => set({ scrollY: y }),
}));
