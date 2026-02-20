import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LanguageCode } from '@/i18n';
import type { Category, Listing, Announcement, Banner } from '@/types';
import {
  getAllListings,
  createListing,
  updateListing,
  deleteListing,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getActiveAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  recordPageView,
  getStats,
  loginAdmin,
  logoutAdmin,
  onAuthChange
} from '@/firebase/services';

// Auth Store with Firebase
interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; username: string; email: string; role: string } | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: any) => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      login: async (email: string, password: string) => {
        const result = await loginAdmin(email, password);
        if (result.success && result.user) {
          set({
            isAuthenticated: true,
            user: { 
              id: result.user.uid, 
              username: result.user.email?.split('@')[0] || 'admin', 
              email: result.user.email || email, 
              role: 'admin' 
            },
          });
          return true;
        }
        return false;
      },
      logout: async () => {
        await logoutAdmin();
        set({ isAuthenticated: false, user: null });
      },
      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },
      initAuth: () => {
        onAuthChange((firebaseUser) => {
          if (firebaseUser) {
            set({
              isAuthenticated: true,
              user: {
                id: firebaseUser.uid,
                username: firebaseUser.email?.split('@')[0] || 'admin',
                email: firebaseUser.email || '',
                role: 'admin'
              }
            });
          } else {
            set({ isAuthenticated: false, user: null });
          }
        });
      }
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

// CMS Store with Firebase
interface CMSState {
  categories: Category[];
  listings: Listing[];
  announcements: Announcement[];
  banners: Banner[];
  isLoading: boolean;
  // Actions
  fetchCategories: () => Promise<void>;
  fetchListings: () => Promise<void>;
  fetchAnnouncements: (categoryId?: string) => Promise<void>;
  fetchBanners: () => Promise<void>;
  addListing: (listing: Omit<Listing, 'id'>) => Promise<string | null>;
  updateListing: (id: string, listing: Partial<Listing>) => Promise<boolean>;
  deleteListing: (id: string) => Promise<boolean>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<string | null>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => Promise<string | null>;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => Promise<boolean>;
  deleteAnnouncement: (id: string) => Promise<boolean>;
  addBanner: (banner: Omit<Banner, 'id'>) => Promise<string | null>;
  updateBanner: (id: string, banner: Partial<Banner>) => Promise<boolean>;
  deleteBanner: (id: string) => Promise<boolean>;
}

export const useCMSStore = create<CMSState>((set, get) => ({
  categories: [],
  listings: [],
  announcements: [],
  banners: [],
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true });
    const categories = await getAllCategories();
    set({ categories, isLoading: false });
  },

  fetchListings: async () => {
    set({ isLoading: true });
    const listings = await getAllListings();
    set({ listings, isLoading: false });
  },

  fetchAnnouncements: async (categoryId?: string) => {
    set({ isLoading: true });
    const announcements = await getActiveAnnouncements(categoryId);
    set({ announcements, isLoading: false });
  },

  fetchBanners: async () => {
    set({ isLoading: true });
    const banners = await getAllBanners();
    set({ banners, isLoading: false });
  },

  addListing: async (listing) => {
    const id = await createListing(listing);
    if (id) {
      await get().fetchListings();
    }
    return id;
  },

  updateListing: async (id, listing) => {
    const success = await updateListing(id, listing);
    if (success) {
      await get().fetchListings();
    }
    return success;
  },

  deleteListing: async (id) => {
    const success = await deleteListing(id);
    if (success) {
      await get().fetchListings();
    }
    return success;
  },

  addCategory: async (category) => {
    const id = await createCategory(category);
    if (id) {
      await get().fetchCategories();
    }
    return id;
  },

  updateCategory: async (id, category) => {
    const success = await updateCategory(id, category);
    if (success) {
      await get().fetchCategories();
    }
    return success;
  },

  deleteCategory: async (id) => {
    const success = await deleteCategory(id);
    if (success) {
      await get().fetchCategories();
    }
    return success;
  },

  addAnnouncement: async (announcement) => {
    const id = await createAnnouncement(announcement);
    if (id) {
      await get().fetchAnnouncements();
    }
    return id;
  },

  updateAnnouncement: async (id, announcement) => {
    const success = await updateAnnouncement(id, announcement);
    if (success) {
      await get().fetchAnnouncements();
    }
    return success;
  },

  deleteAnnouncement: async (id) => {
    const success = await deleteAnnouncement(id);
    if (success) {
      await get().fetchAnnouncements();
    }
    return success;
  },

  addBanner: async (banner) => {
    const id = await createBanner(banner);
    if (id) {
      await get().fetchBanners();
    }
    return id;
  },

  updateBanner: async (id, banner) => {
    const success = await updateBanner(id, banner);
    if (success) {
      await get().fetchBanners();
    }
    return success;
  },

  deleteBanner: async (id) => {
    const success = await deleteBanner(id);
    if (success) {
      await get().fetchBanners();
    }
    return success;
  }
}));

// Traffic Stats Store with Firebase
interface TrafficStatsState {
  pageViews: number;
  uniqueVisitors: number;
  todayViews: number;
  stats: any[];
  incrementPageView: () => void;
  incrementUniqueVisitor: () => void;
  fetchStats: (days?: number) => Promise<void>;
  recordView: (page: string, referrer?: string) => Promise<void>;
}

export const useTrafficStatsStore = create<TrafficStatsState>((set) => ({
  pageViews: 0,
  uniqueVisitors: 0,
  todayViews: 0,
  stats: [],
  incrementPageView: () => set((state) => ({ pageViews: state.pageViews + 1 })),
  incrementUniqueVisitor: () => set((state) => ({ uniqueVisitors: state.uniqueVisitors + 1 })),
  fetchStats: async (days = 7) => {
    const stats = await getStats(days);
    set({ stats });
  },
  recordView: async (page, referrer) => {
    await recordPageView(page, referrer);
    set((state) => ({ pageViews: state.pageViews + 1 }));
  }
}));

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
