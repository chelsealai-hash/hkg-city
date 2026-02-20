// Category Types
export interface Category {
  id: string;
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  image: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
  filters: FilterConfig[];
  createdAt: string;
  updatedAt: string;
}

export interface FilterConfig {
  key: string;
  type: 'select' | 'range' | 'boolean';
  label: Record<string, string>;
  options?: { value: string; label: Record<string, string> }[];
}

// Listing Types
export interface Listing {
  id: string;
  categoryId: string;
  name: Record<string, string>;
  description?: Record<string, string>;
  url: string;
  image?: string;
  region: string;
  subRegion?: string;
  metadata: ListingMetadata;
  sortOrder: number;
  isActive: boolean;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListingMetadata {
  stars?: number;
  priceRange?: string;
  isPublic?: boolean;
  openingHours?: string;
  phone?: string;
  address?: string;
  tags?: string[];
}

// Announcement Types
export interface Announcement {
  id: string;
  categoryId?: string;
  title: Record<string, string>;
  content: Record<string, string>;
  image?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Banner Types
export interface Banner {
  id: string;
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  name: string;
  code: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Traffic Stats Types
export interface TrafficStats {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  pageStats: PageStat[];
  referrerStats: ReferrerStat[];
}

export interface PageStat {
  page: string;
  views: number;
}

export interface ReferrerStat {
  source: string;
  count: number;
}

// Admin Types
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

// Search Types
export interface SearchResult {
  type: 'category' | 'listing';
  item: Category | Listing;
  score: number;
}

// Language Types
export type Language = 'en' | 'zh-HK' | 'zh-CN' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'pt' | 'th';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

// Region Types
export interface Region {
  id: string;
  name: Record<string, string>;
  subRegions?: SubRegion[];
}

export interface SubRegion {
  id: string;
  name: Record<string, string>;
}

// UI Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
}
