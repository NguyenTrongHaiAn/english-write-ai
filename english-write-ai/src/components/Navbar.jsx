

import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'
import './Navbar.css';



function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    logout();
    navigate('/login'); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
  };
  return (
    <nav className="navbar-container">
      <div className="logo">
        
        <Link to="/" className="Hamster_English">Hamster English</Link> 
      </div>
      
      <div className="nav-links">
        {/* Link ngoài (đến Facebook) thì vẫn dùng thẻ <a> bình thường */}
        <a href="https://www.facebook.com/teemo.best.750/?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="nav-button contact-button">Contact Us</a>
        { user ? (
          <>
          <a href="#" onClick={handleLogout} className="navbar-link">Logout</a>
          <Link to="/profile" className="navbar-profile-icon"><i className="fas fa-user-circle"></i></Link>

          </>
        ) : (
          <Link to="/login" className="nav-button login-button">Login/Register</Link>
        )}
        
      </div>
    </nav>
  );
}

export default Navbar;