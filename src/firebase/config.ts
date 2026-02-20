// Firebase Configuration
// Uses hardcoded config for production

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

// Firebase config - hardcoded for reliability
const firebaseConfig = {
  apiKey: "AIzaSyARZup-x_qfJZ7ZfL3TyKdzyXVOAE4G57U",
  authDomain: "hkg-city.firebaseapp.com",
  projectId: "hkg-city",
  storageBucket: "hkg-city.firebasestorage.app",
  messagingSenderId: "484561432661",
  appId: "1:484561432661:web:baf33788cb441e733d64dc"
};

// Initialize Firebase
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export { app, db, auth };
export default app;
