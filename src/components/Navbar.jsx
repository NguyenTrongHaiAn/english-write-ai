// src/components/Navbar.jsx

import React from 'react';
import './Navbar.css'; // Kết nối với file CSS

function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="logo">
        <a href="/">WriteAI</a>
      </div>
      <div className="nav-links">
        <a href="/guide">Hướng dẫn</a>
        <a href="/about">Giới thiệu</a>
        <a href="/login" className="login-button">Đăng nhập</a>
      </div>
    </nav>
  );
}

export default Navbar;