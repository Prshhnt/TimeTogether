import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'video.js/dist/video-js.css';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@auth/AuthContext';
import { ThemeProvider } from './theme/ThemeContext';
import ErrorBoundary from './ErrorBoundary';
import App from './App.jsx';

console.log('main.jsx loading - FULL APP RESTORED!'); // Debug log

// Full application restored with routing
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
