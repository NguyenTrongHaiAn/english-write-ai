// src/components/Navbar.jsx

import React from 'react';
// <<<<<<< HEAD
import '../index.css'; // Kết nối với file CSS
// =======
import { Link } from 'react-router-dom'; // <-- BƯỚC 1: IMPORT LINK
// import './Navbar.css';
// >>>>>>> 09dffd0cc6c3cd9b89e0919923389e8b6c3812b1

function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo-image" />
        
        <Link to="/" className="Hamster_English">Hamster English</Link> 
      </div>
      
      <div className="nav-links">
        {/* Link ngoài (đến Facebook) thì vẫn dùng thẻ <a> bình thường */}
        <a href="https://www.facebook.com/teemo.best.750/?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="nav-button contact-button">Contact Us</a>
        <Link to="/login" className="nav-button login-button">Login/Register</Link>
        
      </div>
    </nav>
  );
}

export default Navbar;