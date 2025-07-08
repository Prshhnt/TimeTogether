import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'video.js/dist/video-js.css';
import './styles.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
