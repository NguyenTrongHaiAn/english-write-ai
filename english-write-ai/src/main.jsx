// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // <-- IMPORT
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- BỌC Ở ĐÂY */}
      <App />
    </BrowserRouter> {/* <-- VÀ ĐÓNG Ở ĐÂY */}
  </React.StrictMode>,
)

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import App from './App.jsx'; // App.jsx sẽ là layout chung
// import LandingPage from './components/landingpage.jsx';
// import AuthPage from './components/AuthPage.jsx';
// import ProfilePage from './pages/ProfilePage.jsx'; // Đảm bảo bạn đã tạo file này

// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         {/* 
//           Sử dụng App.jsx làm layout chung cho toàn bộ trang.
//           Tất cả các Route con sẽ được render bên trong App.jsx
//         */}
//         <Route path="/" element={<App />}>
//           {/* Trang chủ */}
//           <Route index element={<LandingPage />} />
          
//           {/* Trang đăng nhập / đăng ký */}
//           <Route path="login" element={<AuthPage />} />

//           {/* Trang cá nhân (sẽ được bảo vệ sau) */}
//           <Route path="profile" element={<ProfilePage />} />

//           {/* Thêm các trang khác của bạn ở đây */}
//           {/* Ví dụ: <Route path="skills/ielts" element={<IeltsWritingPage />} /> */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );