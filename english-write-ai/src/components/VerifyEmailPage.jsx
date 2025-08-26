// File: src/pages/VerifyEmailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

const VerifyEmailPage = () => {
  const [message, setMessage] = useState('Đang xác thực tài khoản của bạn...');
  const [error, setError] = useState(false);

  const { token } = useParams(); // Lấy token từ URL (ví dụ: /verify-email/abc123...)
  const navigate = useNavigate();

  // useEffect sẽ tự động chạy một lần khi trang được tải
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setMessage('Token xác thực không hợp lệ.');
        setError(true);
        return;
      }

      try {
        // Gửi token lên backend để xác thực
        // Chú ý: Backend của bạn đang mong nhận token trong req.params, nên chúng ta dùng GET
        const response = await axios.get(`${API_URL}/verify-email/${token}`);
        
        setMessage(response.data.message);
        setError(false);

        // Sau 3 giây, tự động chuyển hướng người dùng đến trang đăng nhập
        setTimeout(() => {
          navigate('/login');
        }, 3000);

      } catch (err) {
        setError(true);
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage('Đã có lỗi xảy ra trong quá trình xác thực.');
        }
      }
    };

    verifyToken();
  }, [token, navigate]); // Phụ thuộc vào token và navigate

  return (
    <div style={{ textAlign: 'center', paddingTop: '150px' }}>
      <h1>Trạng thái Kích hoạt Tài khoản</h1>
      <p style={{ color: error ? 'red' : 'green', fontSize: '1.2rem' }}>
        {message}
      </p>
      {!error && <p>Bạn sẽ được tự động chuyển đến trang đăng nhập sau vài giây...</p>}
    </div>
  );
};

export default VerifyEmailPage;