import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Correct import path
import App from './App';
import './index.css';
import './components/Terminal.css';


createRoot(document.getElementById('root')).render(

        <App />

);
