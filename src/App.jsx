// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LandingPage from './components/landingpage.jsx';
import AuthPage from './components/AuthPage.jsx'; // Import trang mới
import Register from './components/register.jsx';
import Getstart from './components/getstart.jsx';
import './App.css'; 

function App() {
  return (
    <>
      {/* Navbar nằm ngoài <Routes> để nó luôn hiển thị trên mọi trang */}
      <Navbar />
      
      <main className="content-wrapper">
        {/* <Routes> hoạt động như một cái tổng đài */}
        <Routes>
          {/* Khi URL là "/", hiển thị LandingPage */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Khi URL là "/login", hiển thị AuthPage */}
          <Route path="/login" element={<AuthPage />} />
          <Route path='/register' element={<Register />} />
          <Route path="/getstart" element={<Getstart />} />
          {/* Bạn có thể thêm các route khác ở đây */}
        </Routes>
      </main>
    </>
  );
}

export default App;