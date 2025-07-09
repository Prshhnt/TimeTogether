import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { AnimatePresence } from 'framer-motion';
// Import components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RoomPage from './components/RoomPage';
import PrivateRoute from '@auth/PrivateRoute';


import ThemeToggle from './components/ui/ThemeToggle';
import { useTheme } from './theme/ThemeContext';
import { useAuth } from '@auth/AuthContext';


function App() {
  const { currentUser, loading } = useAuth();

  // Show loading screen while checking authentication state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading TimeTogether...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ThemeToggle />
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={currentUser ? <Navigate to="/dashboard" replace /> : <Home />} 
        />
        <Route 
          path="/login" 
          element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={currentUser ? <Navigate to="/dashboard" replace /> : <Register />} 
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/room/:roomId" 
          element={
            <PrivateRoute>
              <RoomPage />
            </PrivateRoute>
          } 
        />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
