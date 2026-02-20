// Firebase Services for HKG.CITY
import { db, auth } from './config';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment,
  setDoc
} from 'firebase/firestore';
import { defaultListings } from './seedData';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import type { Listing, Category, Announcement, Banner } from '@/types';

// ==================== AUTH SERVICES ====================

export const loginAdmin = async (email: string, password: string) => {
  if (!auth) return { success: false, error: 'Auth not initialized' };
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const logoutAdmin = async () => {
  if (!auth) return { success: false, error: 'Auth not initialized' };
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = (): User | null => {
  return auth?.currentUser || null;
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
};

// ==================== LISTING SERVICES ====================

const LISTINGS_COLLECTION = 'listings';

// Seed database with default listings if empty
export const seedListings = async (): Promise<boolean> => {
  if (!db) return false;
  try {
    console.log('Seeding database with default listings...');
    const listingsCollection = collection(db, LISTINGS_COLLECTION);
    
    for (const listing of defaultListings) {
      const { id, ...data } = listing;
      const docRef = doc(listingsCollection, id);
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`✓ Seeded: ${id}`);
    }
    
    console.log(`✅ Successfully seeded ${defaultListings.length} listings!`);
    return true;
  } catch (error) {
    console.error('Error seeding listings:', error);
    return false;
  }
};

export const getAllListings = async (): Promise<Listing[]> => {
  if (!db) return [];
  try {
    const q = query(
      collection(db, LISTINGS_COLLECTION),
      orderBy('sortOrder', 'asc')
    );
    const snapshot = await getDocs(q);
    
    // If no listings found, seed the database
    if (snapshot.empty) {
      console.log('No listings found in database. Seeding with default data...');
      const seeded = await seedListings();
      if (seeded) {
        // Fetch again after seeding
        const newSnapshot = await getDocs(q);
        return newSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Listing));
      }
    }
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Listing));
  } catch (error) {
    console.error('Error getting listings:', error);
    return [];
  }
};

export const getListingsByCategory = async (categoryId: string): Promise<Listing[]> => {
  if (!db) return [];
  try {
    const q = query(
      collection(db, LISTINGS_COLLECTION),
      where('categoryId', '==', categoryId),
      where('isActive', '==', true),
      orderBy('sortOrder', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Listing));
  } catch (error) {
    console.error('Error getting listings by category:', error);
    return [];
  }
};

export const getListingById = async (id: string): Promise<Listing | null> => {
  if (!db) return null;
  try {
    const docRef = doc(db, LISTINGS_COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Listing;
    }
    return null;
  } catch (error) {
    console.error('Error getting listing:', error);
    return null;
  }
};

export const createListing = async (listing: Omit<Listing, 'id'>): Promise<string | null> => {
  if (!db) return null;
  try {
    const docRef = await addDoc(collection(db, LISTINGS_COLLECTION), {
      ...listing,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating listing:', error);
    return null;
  }
};

export const updateListing = async (id: string, data: Partial<Listing>): Promise<boolean> => {
  if (!db) return false;
  try {
    const docRef = doc(db, LISTINGS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating listing:', error);
    return false;
  }
};

export const deleteListing = async (id: string): Promise<boolean> => {
  if (!db) return false;
  try {
    await deleteDoc(doc(db, LISTINGS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting listing:', error);
    return false;
  }
};

export const incrementListingClicks = async (id: string): Promise<boolean> => {
  if (!db) return false;
  try {
    const docRef = doc(db, LISTINGS_COLLECTION, id);
    await updateDoc(docRef, {
      clickCount: increment(1)
    });
    return true;
  } catch (error) {
    console.error('Error incrementing clicks:', error);
    return false;
  }
};

// ==================== CATEGORY SERVICES ====================

const CATEGORIES_COLLECTION = 'categories';

export const getAllCategories = async (): Promise<Category[]> => {
  if (!db) return [];
  try {
    const q = query(
      collection(db, CATEGORIES_COLLECTION),
      orderBy('sortOrder', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category));
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

export const getActiveCategories = async (): Promise<Category[]> => {
  if (!db) return [];
  try {
    const q = query(
      collection(db, CATEGORIES_COLLECTION),
      where('isActive', '==', true),
      orderBy('sortOrder', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category));
  } catch (error) {
    console.error('Error getting active categories:', error);
    return [];
  }
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<string | null> => {
  if (!db) return null;
  try {
    const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), {
      ...category,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
};

export const updateCategory = async (id: string, data: Partial<Category>): Promise<boolean> => {
  if (!db) return false;
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating category:', error);
    return false;
  }
};

export const deleteCategory = async (id: string): Promise<boolean> => {
  if (!db) return false;
  try {
    await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
};

// ==================== ANNOUNCEMENT SERVICES ====================

const ANNOUNCEMENTS_COLLECTION = 'announcements';

export const getActiveAnnouncements = async (categoryId?: string): Promise<Announcement[]> => {
  if (!db) return [];
  try {
    let q;
    if (categoryId) {
      q = query(
        collection(db, ANNOUNCEMENTS_COLLECTION),
        where('isActive', '==', true),
        where('categoryId', '==', categoryId),
        orderBy('startDate', 'desc')
      );
    } else {
      q = query(
        collection(db, ANNOUNCEMENTS_COLLECTION),
        where('isActive', '==', true),
        orderBy('startDate', 'desc')
      );
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Announcement));
  } catch (error) {
    console.error('Error getting announcements:', error);
    return [];
  }
};

export const createAnnouncement = async (announcement: Omit<Announcement, 'id'>): Promise<string | null> => {
  if (!db) return null;
  try {
    const docRef = await addDoc(collection(db, ANNOUNCEMENTS_COLLECTION), {
      ...announcement,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating announcement:', error);
    return null;
  }
};

export const updateAnnouncement = async (id: string, data: Partial<Announcement>): Promise<boolean> => {
  if (!db) return false;
  try {
    const docRef = doc(db, ANNOUNCEMENTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating announcement:', error);
    return false;
  }
};

export const deleteAnnouncement = async (id: string): Promise<boolean> => {
  if (!db) return false;
  try {
    await deleteDoc(doc(db, ANNOUNCEMENTS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return false;
  }
};

// ==================== BANNER SERVICES ====================

const BANNERS_COLLECTION = 'banners';

export const getAllBanners = async (): Promise<Banner[]> => {
  if (!db) return [];
  try {
    const q = query(
      collection(db, BANNERS_COLLECTION),
      orderBy('position', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Banner));
  } catch (error) {
    console.error('Error getting banners:', error);
    return [];
  }
};

export const getActiveBannersByPosition = async (position: string): Promise<Banner[]> => {
  if (!db) return [];
  try {
    const q = query(
      collection(db, BANNERS_COLLECTION),
      where('position', '==', position),
      where('isActive', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Banner));
  } catch (error) {
    console.error('Error getting banners by position:', error);
    return [];
  }
};

export const createBanner = async (banner: Omit<Banner, 'id'>): Promise<string | null> => {
  if (!db) return null;
  try {
    const docRef = await addDoc(collection(db, BANNERS_COLLECTION), {
      ...banner,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating banner:', error);
    return null;
  }
};

export const updateBanner = async (id: string, data: Partial<Banner>): Promise<boolean> => {
  if (!db) return false;
  try {
    const docRef = doc(db, BANNERS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating banner:', error);
    return false;
  }
};

export const deleteBanner = async (id: string): Promise<boolean> => {
  if (!db) return false;
  try {
    await deleteDoc(doc(db, BANNERS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting banner:', error);
    return false;
  }
};

// ==================== STATS SERVICES ====================

const STATS_COLLECTION = 'stats';

export const recordPageView = async (page: string, referrer?: string): Promise<boolean> => {
  if (!db) return false;
  try {
    const today = new Date().toISOString().split('T')[0];
    const docRef = doc(db, STATS_COLLECTION, today);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        pageViews: increment(1),
        [`pageStats.${page}`]: increment(1),
        ...(referrer && { [`referrerStats.${referrer}`]: increment(1) })
      });
    } else {
      await addDoc(collection(db, STATS_COLLECTION), {
        date: today,
        pageViews: 1,
        uniqueVisitors: 1,
        pageStats: { [page]: 1 },
        referrerStats: referrer ? { [referrer]: 1 } : {},
        createdAt: serverTimestamp()
      });
    }
    return true;
  } catch (error) {
    console.error('Error recording page view:', error);
    return false;
  }
};

export const getStats = async (days: number = 7): Promise<any[]> => {
  if (!db) return [];
  try {
    const q = query(
      collection(db, STATS_COLLECTION),
      orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.slice(0, days).map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting stats:', error);
    return [];
  }
};
