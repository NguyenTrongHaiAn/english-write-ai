// src/components/AuthPage.jsx

import React, { useState } from 'react';
import './AuthPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Dùng để chuyển trang sau khi đăng nhập
import { useAuth } from '../context/AuthContext.jsx'; // Dùng context để quản lý trạng thái đăng nhập

// URL của API backend
const API_URL = 'http://localhost:3001/api/auth';

function AuthPage() {
  // State để chuyển đổi giữa form đăng nhập và đăng ký
  const [isLoginMode, setIsLoginMode] = useState(true);  
  
  // State để lưu dữ liệu người dùng nhập vào form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '' // Chỉ dùng trong chế độ đăng ký
  });
  
  // State để hiển thị thông báo lỗi hoặc thành công
  const [message, setMessage] = useState('');
  // State để xử lý trạng thái loading khi đang gọi API
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State để hiển thị/ẩn mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  // Lấy các công cụ cần thiết từ hooks
  const navigate = useNavigate(); // Hook để chuyển hướng trang
  const { login } = useAuth();    // Hàm `login` từ AuthContext để cập nhật trạng thái toàn cục

  // Hàm được gọi mỗi khi người dùng thay đổi nội dung trong các ô input
  const handleChange = (e) => {
    setFormData({
      ...formData, // Giữ lại các giá trị cũ
      [e.target.name]: e.target.value // Cập nhật trường đang được thay đổi
    });
    setMessage(''); // Xóa thông báo cũ khi người dùng bắt đầu nhập liệu
  };

  // Hàm chuyển đổi giữa chế độ Đăng nhập và Đăng ký
  const handleSwitchMode = (e) => {
    e.preventDefault(); 
    setIsLoginMode(!isLoginMode);
    // Reset form và message khi chuyển chế độ
    setFormData({ fullName: '', email: '', password: '' });
    setMessage(''); 
  };

  // Hàm xử lý chính khi người dùng nhấn nút submit form
  const handleSubmit = async (e) => {
      e.preventDefault(); // Ngăn trình duyệt tải lại trang
      setIsLoading(true); // Bật trạng thái loading
      setMessage('');
      const { fullName, email, password, confirmPassword } = formData;
      // Xác định endpoint API dựa trên chế độ (đăng nhập hay đăng ký)
      const endpoint = isLoginMode ? '/login' : '/register';
      const url = API_URL + endpoint;

      // Chuẩn bị dữ liệu (payload) để gửi lên server
      const payload = isLoginMode 
        ? { email: formData.email, password: formData.password } 
        : { fullName: formData.fullName, email: formData.email, password: formData.password };

        if(!isLoginMode && password !== confirmPassword) {
          setMessage('Passwords do not match. Please check again.');
          setFormData({ ...formData, password: '', confirmPassword: '' });
          setIsLoading(false);
          return;
        }
      try {
        const response = await axios.post(url, payload);

        // Xử lý logic sau khi gọi API thành công
        if (response.data.token && response.data.user) {
          // 1. Gọi hàm login từ context để lưu token và thông tin user,
          // cập nhật trạng thái đăng nhập cho toàn bộ ứng dụng.
          login(response.data.user, response.data.token);

          // 2. Chuyển hướng người dùng đến trang cá nhân.
          navigate('/profile'); 
        } else if (!isLoginMode) { 
          // Xử lý khi đăng ký thành công
          setMessage(response.data.message);
          setIsLoginMode(true); // Tự động chuyển sang form đăng nhập
        }

      } catch (error) { 
          // Xử lý khi có lỗi xảy ra
          if (error.response && error.response.data && error.response.data.message) {
            setMessage(error.response.data.message);
          } else {
            setMessage('Đã xảy ra lỗi, vui lòng thử lại sau.');
          }
          console.error(error);
      } finally {
          // Dù thành công hay thất bại, cuối cùng cũng tắt trạng thái loading
          setIsLoading(false);
      }
  };
  //HAM XU LY QUEN MAT KHAU
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if(!formData.email) {
       
      setMessage('Please enter your email to reset password.');
      return;
    }
    setIsLoading(true);
    setMessage('');
      
      try {
        const url = API_URL + '/forgot-password';
        const payload = { email: formData.email, };
        const response = await axios.post(url, payload);
        setMessage(response.data.message);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage('An error occurred, please try again later.');
        }
        console.error(error);
      }finally{setIsLoading(false);}

    
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>HELLO!</h2>
        <p>Welcome to our platform. Please {isLoginMode ? 'log in' : 'register'} to continue.</p>
       
        <form onSubmit={handleSubmit}>
          {/* Chỉ hiển thị ô Full Name khi ở chế độ đăng ký */}
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
          <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"} 
            name="password"
            placeholder="Type your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
            <i 
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
           </div>
      
          { !isLoginMode && (
            <div className='password-wrapper'> 
              <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
              <i 
                className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></i>
            </div>
           
          )

          }
          
          {/* Hiển thị thông báo */}
          {message && <p className="auth-message">{message}</p>}
          
          {/* Nút submit có trạng thái loading và thay đổi text */}
          <button className="auth-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLoginMode ? 'Log in' : 'Sign in')}

          </button>
        </form>
       
        <div className="switch-auth">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <a href="#" onClick={handleSwitchMode}>
            {isLoginMode ? 'Register' : 'Log In'}
          </a>
          
        </div>
        <div className="switch-auth">
          <a className="switch-auth" onClick={handleForgotPassword} >{isLoginMode ? 'Forgot Password?' : ''}</a>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;