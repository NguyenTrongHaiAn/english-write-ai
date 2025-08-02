// src/components/AuthPage.jsx
import { Link } from 'react-router-dom';
import React from 'react';
import './AuthPage.css'; // File CSS để trang trí

function AuthPage() {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>WELCOME BACK!</h2>
        <p>Please log in to continue</p>
        <input type="email" placeholder="Type your email" />
        <input type="password" placeholder="Type your pasword" />
        <button className="auth-button">Log in</button>
        <a href="#" className="forgot-password">Forgot your pasword?</a>
        <div className="switch-auth">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;