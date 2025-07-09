import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// PrivateRoute component to protect authenticated routes
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  // If user is not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated, render the protected component
  return children;
};

export default PrivateRoute;
