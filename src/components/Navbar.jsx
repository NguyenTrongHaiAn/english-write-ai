// src/components/Navbar.jsx

import React from 'react';
import './Navbar.css'; // Kết nối với file CSS

function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="Logo">
            <img src="/Logo/png"></img>
            <div className="Hamster_English"> Hamster English</div>
            
      </div>
      
      <div className="nav-links">
        <a href="/login" className="login-button">Đăng nhập/Đăng kí</a>
      </div>
    </nav>
  );
}

export default Navbar;