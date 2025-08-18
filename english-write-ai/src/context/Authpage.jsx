// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Tạo Context
const AuthContext = createContext(null);

// 2. Tạo Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Kiểm tra localStorage khi app khởi động để duy trì trạng thái đăng nhập
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Hàm để xử lý logic đăng nhập
  const login = (userData, userToken) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
    setUser(userData);
    setToken(userToken);
  };

  // Hàm để xử lý logic đăng xuất
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Tạo một Hook tùy chỉnh để dễ dàng sử dụng context
export function useAuth() {
  return useContext(AuthContext);
}