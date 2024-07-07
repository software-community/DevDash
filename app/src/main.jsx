import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Correct import path
import App from './App';
import './index.css';
import './components/Terminal.css';
import store from './redux/store.js';
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <App/>
    </>
  </React.StrictMode>
)
