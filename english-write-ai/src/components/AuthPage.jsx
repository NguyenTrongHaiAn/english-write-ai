// src/components/AuthPage.jsx

import React from 'react';
<<<<<<< HEAD
import './AuthPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // THÊM VÀO: Import hook để điều hướng
import { useAuth } from '../context/Authpage.jsx'; // Đường dẫn đã đúng

const API_URL = 'http://localhost:3001/api/auth';

function AuthPage() {
  // --- Các state của bạn đã rất tốt, giữ nguyên ---
  const [isLoginMode, setIsLoginMode] = React.useState(true);  
=======
import './AuthPage.css'; // File CSS để trang trí
import axios from 'axios';
const API_URL = 'http://localhost:3001/api/auth';


function AuthPage() {
  // logic giao diện đăng nhập
  // sử dụng reak hooks useState để quan lý trạng thái nếu cần
  // có thể sử dụng useEffect để thực hiện các tác vụ khi component được mount
  const[isLoginMode, setIsLoginMode] = React.useState(true);  

  //state (trạng thái) là dữ liệu nội tại của một component, 
  // và có thể thay đổi theo thời gian 
  // (khi người dùng tương tác, hoặc khi dữ liệu bên ngoài thay đổi).

  //Hook (useState) dùng để tạo và quản lý state của một form gồm 3 trường: fullName, email, password.

>>>>>>> d90d751d45a1aadbefd0c0b038732c854d0d40aa
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
<<<<<<< HEAD
  
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

=======
  //cách component lắng nghe sự kiện thay đổi của các trường input
  const handleChange=(e)=>{
    setFormData({
      //cú pháp "spread operator" trong JavaScript: ...
      // ...formData sao chép tất cả các trường hiện tại trong formData
      // và sau đó cập nhật trường cụ thể mà người dùng đang nhập.
      // Điều này giúp giữ nguyên các giá trị đã nhập trước đó.
      ...formData,
      //	Là name của input – dùng để xác định cập nhật trường nào
      //e.target.value là giá trị mới của trường input.
      //Cập nhật giá trị của trường tương ứng trong formData.
      [e.target.name]: e.target.value
    });
    // cách hoạt động như sau:
    //...formData	Tạo bản sao tất cả trường hiện tại trong form
    //[e.target.name]: e.target.value	Ghi đè đúng trường đang bị người dùng thay đổi
    //setFormData({...})	Gửi object mới này vào React để cập nhật và render lại form
        setMessage(''); // Xóa thông báo cũ khi người dùng bắt đầu gõ
  };

  //khi người dùng ấn vào register, sẽ thay đổi trạng thái isLoginMode
>>>>>>> d90d751d45a1aadbefd0c0b038732c854d0d40aa
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

<<<<<<< HEAD
  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setMessage('');

      const endpoint = isLoginMode ? '/login' : '/register';
      const url = API_URL + endpoint;

=======

  const handleSubmit = async (e) => {
      e.preventDefault(); // Ngăn form reload trang
      setIsLoading(true); // Bật trạng thái loading
      setMessage(''); // Xóa thông báo cũ

      const endpoint = isLoginMode ? '/login' : '/register';
      // Xác định endpoint dựa trên chế độ đăng nhập/đăng ký
      // API_URL là biến môi trường chứa URL của API
      const url=API_URL + endpoint;

      //payload là dữ liệu sẽ được gửi đến server khi người dùng đăng nhập hoặc đăng ký
>>>>>>> d90d751d45a1aadbefd0c0b038732c854d0d40aa
      const payload = isLoginMode ? {
        email: formData.email,
        password: formData.password,
      } : {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };
<<<<<<< HEAD

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

=======
      try {
        // Sử dụng axios để gửi request đến server
        // axios là thư viện giúp gửi HTTP requests
        // response là kết quả trả về từ server
        const response = await axios.post(url, payload);
        // Nếu đăng nhập/đăng ký thành công, lưu token và thông tin người dùng
        // response.data chứa dữ liệu trả về từ server
        setMessage(response.data.message ); // Hiển thị thông báo từ server
        //localStorage là nơi lưu trữ dữ liệu trên trình duyệt
        // setItem là phương thức để lưu dữ liệu vào localStorage 
        localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Lưu thông tin người dùng
        alert(response.data.message);
      }catch (error) { 
          if (error.response && error.response.data && error.response.data.message) {
            setMessage(error.response.data.message); // Hiển thị thông báo lỗi từ server
          }else {
            setMessage('Đã xảy ra lỗi, vui lòng thử lại sau.'); // Thông báo lỗi chung
          }console.error(error)
        } finally {
          setIsLoading(false); // Tắt trạng thái loading
        }
  };

  // xác thực người dùng đã đăng nhập và lấy thông tin cá nhân
  const fetchUserProfile = async () => {
  try {
    // 1. Lấy token đã được lưu từ localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    // 2. Tạo một "instance" của axios với cấu hình đặc biệt
    // để tự động đính kèm token vào mọi yêu cầu
    const api = axios.create({
      baseURL: 'http://localhost:3001/api/',
      headers: {
        // 3. Đính kèm token vào header 'Authorization'
        // Đây chính là lúc bạn "đeo thẻ nhân viên"
        'Authorization': `Bearer ${token}`
      }
    });

    // 4. Gửi yêu cầu đến một route được bảo vệ (chúng ta sẽ tạo route này ở backend)
    const response = await api.get('/users/profile'); // Ví dụ: GET /api/users/profile

    console.log("Thông tin cá nhân:", response.data);
    alert(`Chào mừng trở lại, ${response.data.user.full_name}`);


  } catch (error) {
    console.error("Không thể lấy thông tin cá nhân:", error);
    alert(error.response?.data?.message || "Phiên đăng nhập đã hết hạn hoặc không hợp lệ.");
  }
};
>>>>>>> d90d751d45a1aadbefd0c0b038732c854d0d40aa
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>HELLO!</h2>
        <p>Welcome to our platform. Please {isLoginMode ? 'log in' : 'register'} to continue.</p>
       
        <form onSubmit={handleSubmit}>
<<<<<<< HEAD
          { !isLoginMode && (
=======

           {
            //short-circuit rendering : &&
          !isLoginMode && (
>>>>>>> d90d751d45a1aadbefd0c0b038732c854d0d40aa
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
<<<<<<< HEAD
=======

>>>>>>> d90d751d45a1aadbefd0c0b038732c854d0d40aa
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
<<<<<<< HEAD
          {message && <p className="auth-message">{message}</p>}
          
          {/* SỬA LẠI: Thêm thuộc tính `disabled` và thay đổi text khi loading */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLoginMode ? 'Đăng nhập' : 'Đăng ký')}
          </button>
=======
           {/* Hiển thị thông báo lỗi/thành công */}
          {message && <p style={{ color: 'red' }}>{message}</p>}
          
          <button type="submit">{isLoginMode ? 'Đăng nhập' : 'Đăng ký'}</button>
          

>>>>>>> d90d751d45a1aadbefd0c0b038732c854d0d40aa
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