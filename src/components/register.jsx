import React, { useState } from 'react';
import './register.css'; // Import file CSS

const Register = () => {
  // Sử dụng useState để quản lý trạng thái cho từng ô nhập liệu
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State để lưu trữ và hiển thị lỗi
  const [errors, setErrors] = useState({});

  // Hàm xử lý khi người dùng thay đổi giá trị trong các ô input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm kiểm tra dữ liệu đầu vào
  const validateForm = () => {
    let formErrors = {};
    if (!formData.username) {
      formErrors.username = 'Vui lòng nhập tên người dùng.';
    }
    if (!formData.email) {
      formErrors.email = 'Vui lòng nhập email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Địa chỉ email không hợp lệ.';
    }
    if (!formData.password) {
      formErrors.password = 'Vui lòng nhập mật khẩu.';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }
    return formErrors;
  };

  // Hàm xử lý khi người dùng gửi form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // Nếu không có lỗi, xử lý logic đăng ký ở đây (ví dụ: gọi API)
      console.log('Dữ liệu hợp lệ, đang gửi đi:', formData);
      alert('Đăng ký thành công!');
      // Reset form sau khi đăng ký thành công
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
    } else {
      // Nếu có lỗi, cập nhật state errors để hiển thị cho người dùng
      setErrors(formErrors);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <h2>Create an account</h2>
        <p className="form-description">
Begin your journey toward stronger writing skills today.        </p>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="submit-button">Sign in</button>

        <div className="login-link">
          <p>Have an account? <a href="/login">Sign in here</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;