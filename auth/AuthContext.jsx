import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Auth Provider Component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMethods, setAuthMethods] = useState(null);

  // Initialize Firebase methods dynamically
  useEffect(() => {
    console.log('AuthProvider: Initializing Firebase...'); // Debug log
    
    const initFirebase = async () => {
      try {
        // Import Firebase modules dynamically
        const firebaseModule = await import('./firebase.js');
        const authModule = await import('firebase/auth');
        
        console.log('AuthProvider: Firebase modules loaded successfully'); // Debug log
        
        const {
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged,
          updateProfile
        } = authModule;
        
        const auth = firebaseModule.auth;
        
        // Store auth methods
        setAuthMethods({
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          updateProfile,
          auth
        });
        
        // Set up auth state listener
        console.log('AuthProvider: Setting up auth state listener...'); // Debug log
        
        const unsubscribe = onAuthStateChanged(auth, 
          (user) => {
            console.log('AuthProvider: Auth state changed:', user); // Debug log
            setCurrentUser(user);
            setLoading(false);
          }, 
          (error) => {
            console.error('AuthProvider: Auth state change error:', error); // Error log
            setLoading(false);
          }
        );

        // Fallback timeout to prevent infinite loading
        const timeout = setTimeout(() => {
          console.warn('AuthProvider: Auth initialization timeout, proceeding anyway...');
          setLoading(false);
        }, 10000); // 10 second timeout

        // Cleanup function
        return () => {
          console.log('AuthProvider: Cleaning up auth listener...'); // Debug log
          unsubscribe();
          clearTimeout(timeout);
        };
        
      } catch (error) {
        console.error('AuthProvider: Error initializing Firebase:', error);
        setLoading(false);
      }
    };
    
    initFirebase();
  }, []);

  // Register new user with email and password
  const register = async (name, email, password) => {
    if (!authMethods) {
      throw new Error('Firebase not initialized');
    }
    
    try {
      const result = await authMethods.createUserWithEmailAndPassword(authMethods.auth, email, password);
      
      // Update the user's display name
      if (name) {
        await authMethods.updateProfile(result.user, {
          displayName: name
        });
      }
      
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    if (!authMethods) {
      throw new Error('Firebase not initialized');
    }
    
    try {
      return await authMethods.signInWithEmailAndPassword(authMethods.auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    if (!authMethods) {
      throw new Error('Firebase not initialized');
    }
    
    try {
      return await authMethods.signOut(authMethods.auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Context value object
  const value = {
    currentUser,
    register,
    login,
    logout,
    loading
  };

  console.log('AuthProvider rendering, loading:', loading, 'currentUser:', currentUser); // Debug log

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
