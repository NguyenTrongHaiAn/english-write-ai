// src/App.jsx

import Navbar from './components/Navbar.jsx';
import LandingPage from './components/landingpage.jsx'; // Giữ nguyên nếu tên file của bạn là chữ thường
import './App.css'; 

function App() {
  return (
    
    <>
      
      <Navbar />
      <main className="content-wrapper">
        <LandingPage />
      </main>
    </>
  );
}

export default App;