// Firebase Configuration
// Replace with your actual Firebase project config after creating project

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { getAnalytics, type Analytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// Get this from Firebase Console > Project Settings > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyARZup-x_qfJZ7ZfL3TyKdzyXVOAE4G57U",
  authDomain: "hkg-city.firebaseapp.com",
  projectId: "hkg-city",
  storageBucket: "hkg-city.firebasestorage.app",
  messagingSenderId: "484561432661",
  appId: "1:484561432661:web:baf33788cb441e733d64dc",
  measurementId: "G-1EXBW3WZHS"
};

// Initialize Firebase
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;
let analytics: Analytics | undefined;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  analytics = getAnalytics(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export { app, db, auth, analytics };
export default app;
