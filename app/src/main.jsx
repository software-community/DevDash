import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Terminal from './components/Terminal.jsx'
import './components/Terminal.css'

const terminalContainerStyle = {
  position: 'fixed',
  top: '20px',
  left: '0px',
  width: '100%',
  height: '50vh', // Set height to 50% of viewport height
  zIndex: 1000, // Ensure it stays above other elements
  backgroundColor: 'black', // Optional: to match the terminal's background
  color: 'white' // Optional: to match the terminal's text color
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
    {/* <p>Hello</p> */}
      <App/>
    </>
  </React.StrictMode>,
)
