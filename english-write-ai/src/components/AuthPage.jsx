// src/components/AuthPage.jsx

import React from 'react';
import './AuthPage.css'; // File CSS để trang trí

function AuthPage() {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Chào mừng bạn trở lại!</h2>
        <p>Đăng nhập để tiếp tục</p>
        <input type="email" placeholder="Nhập email của bạn" />
        <input type="password" placeholder="Nhập mật khẩu" />
        <button className="auth-button">Đăng nhập</button>
        <a href="#" className="forgot-password">Quên mật khẩu?</a>
        <div className="switch-auth">
          Chưa có tài khoản? <a href="#">Đăng kí ngay</a>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;