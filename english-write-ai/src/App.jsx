// src/App.jsx
import {  Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx'; // Import AuthProvider để bọc ứng dụng


import Navbar from './components/Navbar.jsx';
import LandingPage from './components/landingpage.jsx';
import AuthPage from './components/AuthPage.jsx';
import WritingPage from './components/WritingPage.jsx'; 
// --- THÊM VÀO: Import trang cá nhân (ProfilePage) ---
import ProfilePage from './pages/ProfilePage.jsx';


import Getstartpage from './components/getstartpage.jsx'; // Trang chủ của layout

import './App.css';

// --- THÊM VÀO: Component để bảo vệ các route yêu cầu đăng nhập ---
// Component này hoạt động như một người bảo vệ.
// Nó kiểm tra xem người dùng đã có "token" (đã đăng nhập) chưa.
// Nếu có, nó cho phép hiển thị trang. Nếu không, nó sẽ điều hướng về trang /login.
function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    // --- THAY ĐỔI: Bọc toàn bộ ứng dụng trong <AuthProvider> và <Router> ---
    // <AuthProvider> cung cấp thông tin đăng nhập cho toàn bộ ứng dụng, sửa lỗi "useAuth is null".
    // <Router> kích hoạt chức năng định tuyến (routing) cho ứng dụng.
    <AuthProvider>
      
        {/* Navbar và main layout được giữ nguyên */}
        <Navbar />
        <main className="content-wrapper">
          <Routes>
            {/* ---- GIỮ NGUYÊN: CÁC ROUTE CƠ BẢN CỦA BẠN ---- */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/writing/:challengeId" element={<WritingPage />} />

            {/* ---- THÊM VÀO: ROUTE CHO TRANG CÁ NHÂN ĐƯỢC BẢO VỆ ---- */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="/skills" element={<Getstartpage />} />
            {/* --- THÊM VÀO (Tùy chọn): Route để xử lý các đường dẫn không hợp lệ --- */}
            {/* Nếu người dùng truy cập một URL không tồn tại, họ sẽ được điều hướng về trang chủ. */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </main>
      
    </AuthProvider>

  );
}

export default App;