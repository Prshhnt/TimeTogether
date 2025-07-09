// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration object
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyBNCZQ5D_m0IKDSN46g7VrgRvWT_hQ5CIU",
  authDomain: "timetogether-e7cf4.firebaseapp.com",
  projectId: "timetogether-e7cf4",
  storageBucket: "timetogether-e7cf4.firebasestorage.app",
  messagingSenderId: "674674415300",
  appId: "1:674674415300:web:c49286e1e39bffba9b1b91",
  measurementId: "G-JHGZWYKB4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Export the app instance if needed elsewhere
export default app;
