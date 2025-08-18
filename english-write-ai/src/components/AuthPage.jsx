// src/components/AuthPage.jsx

import React from 'react';
import './AuthPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // THÊM VÀO: Import hook để điều hướng
import { useAuth } from '../context/Authpage.jsx'; // Đường dẫn đã đúng

const API_URL = 'http://localhost:3001/api/auth';

function AuthPage() {
  // --- Các state của bạn đã rất tốt, giữ nguyên ---
  const [isLoginMode, setIsLoginMode] = React.useState(true);  
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  
  // --- THÊM VÀO: Khởi tạo các hook cần thiết ---
  const navigate = useNavigate(); // Hook để chuyển trang
  const { login } = useAuth();    // Lấy hàm login từ context

  // --- Các hàm handle của bạn đã tốt, giữ nguyên ---
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setMessage('');
  };

  const handleSwitchMode = (e) => {
    e.preventDefault(); 
    setIsLoginMode(!isLoginMode);
    setFormData({
      fullName: '',
      email: '',
      password: ''
    });
    setMessage(''); 
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setMessage('');

      const endpoint = isLoginMode ? '/login' : '/register';
      const url = API_URL + endpoint;

      const payload = isLoginMode ? {
        email: formData.email,
        password: formData.password,
      } : {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };

      try {
        const response = await axios.post(url, payload);

        // --- SỬA LẠI PHẦN LOGIC SAU KHI GỌI API ---
        if (response.data.token && response.data.user) {
          // 1. Gọi hàm login từ context (đã được lấy ở trên)
          login(response.data.user, response.data.token);

          // 2. Chuyển hướng người dùng (sử dụng navigate đã khai báo)
          navigate('/profile'); 
        } else if (!isLoginMode) { 
          // Xử lý trường hợp đăng ký thành công mà API không trả về token
          setMessage(response.data.message || 'Đăng ký thành công! Vui lòng đăng nhập.');
          setIsLoginMode(true); // Tự động chuyển sang form đăng nhập
        } else {
            // Trường hợp đăng nhập mà API không trả token
            setMessage(response.data.message || "Thông tin đăng nhập không chính xác.")
        }
      } catch (error) { 
          if (error.response && error.response.data && error.response.data.message) {
            setMessage(error.response.data.message);
          } else {
            setMessage('Đã xảy ra lỗi, vui lòng thử lại sau.');
          }
          console.error(error);
        } finally {
          setIsLoading(false);
        }
  };

  // --- XÓA ĐI: Hàm fetchUserProfile không cần thiết ở component này ---
  // const fetchUserProfile = async () => { ... };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>HELLO!</h2>
        <p>Welcome to our platform. Please {isLoginMode ? 'log in' : 'register'} to continue.</p>
       
        <form onSubmit={handleSubmit}>
          { !isLoginMode && (
                <input
                  type="text"
                  name="fullName"
                  placeholder="Type your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
               )
            }
          <input
            type="email"
            name="email"
            placeholder="Type your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Type your password"
            value={formData.password}
            onChange={handleChange}
            required
          />  
          {message && <p className="auth-message">{message}</p>}
          
          {/* SỬA LẠI: Thêm thuộc tính `disabled` và thay đổi text khi loading */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLoginMode ? 'Đăng nhập' : 'Đăng ký')}
          </button>
        </form>
       
        <div className="switch-auth">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <a href="#" onClick={handleSwitchMode}>
            {isLoginMode ? 'Register' : 'Log In'}
          </a>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;