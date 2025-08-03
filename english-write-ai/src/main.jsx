// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // <-- IMPORT
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- BỌC Ở ĐÂY */}
      <App />
    </BrowserRouter> {/* <-- VÀ ĐÓNG Ở ĐÂY */}
  </React.StrictMode>,
)