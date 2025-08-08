// src/App.jsx

import { Routes, Route } from 'react-router-dom';

// Import các component Navbar và Trang
import Navbar from './components/Navbar.jsx';
import LandingPage from './components/landingpage.jsx';
import AuthPage from './components/AuthPage.jsx';
// Import Layout và các trang con
import GetstartLayout from './layouts/GetstartLayout.jsx'; 
import Getstartpage from './components/getstartpage.jsx'; // Trang chủ của layout

// Import các trang mẫu để thử nghiệm
import IeltsWritingPage from './pages/IeltsWritingPage.jsx';
import ProfessionalWritingPage from './pages/ProfessionalWritingPage.jsx';
import AcademicWritingPage from './pages/AcademicWritingPage.jsx';
import CreativeWritingPage from './pages/CreativeWritingPage.jsx';

// Import file CSS
import './App.css'; 

function App() {
  return (
    <>
      <Navbar /> 
      <main className="content-wrapper">
        <Routes>
          {/* ---- CÁC ROUTE CƠ BẢN ---- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          
          {/* ---- KHỐI ROUTE CHO CÁC TRANG KỸ NĂNG ---- */}
          <Route path="/skills" element={<GetstartLayout />}>
            
            {/* Trang chủ cho mục /skills */}
            <Route index element={<Getstartpage />} />

            {/* == Luyện thi IELTS == */}
            <Route path="ielts/writing-task-1" element={<IeltsWritingPage />} />
            <Route path="ielts/writing-task-2" element={<IeltsWritingPage />} />
            <Route path="ielts/full-test-challenge" element={<IeltsWritingPage />} />

            {/* == Viết cho Công việc == */}
            <Route path="professional/cv-cover-letter" element={<ProfessionalWritingPage />} />
            <Route path="professional/email" element={<ProfessionalWritingPage />} />
            <Route path="professional/linkedin" element={<ProfessionalWritingPage />} />
            <Route path="professional/reports" element={<ProfessionalWritingPage />} />
            
            {/* == Viết Học thuật == */}
            <Route path="academic/personal-statement" element={<AcademicWritingPage />} />
            <Route path="academic/essays" element={<AcademicWritingPage />} />
            <Route path="academic/abstract" element={<AcademicWritingPage />} />

            {/* == Viết Sáng tạo & Nội dung số == */}
            <Route path="creative/blog-social" element={<CreativeWritingPage />} />
            <Route path="creative/short-story" element={<CreativeWritingPage />} />
            <Route path="creative/script-speech" element={<CreativeWritingPage />} />

          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;