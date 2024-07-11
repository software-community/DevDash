import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import URLContext from './contexts/URLContext.jsx';

createRoot(document.getElementById('root')).render(

  <URLContext>
    <App />
  </URLContext>

);
