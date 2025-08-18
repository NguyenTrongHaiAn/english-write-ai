import React, { useState } from 'react';
import './getstartpage.css';

// Import các component khối
import HeroSection from './homepageSections/HeroSection';
import DashboardSection from './homepageSections/DashboardSection';
import ChallengesSection from './homepageSections/ChallengesSection';
import CategoriesSection from './homepageSections/CategoriesSection';
import NewsSection from './homepageSections/NewsSection';
import TestimonialsSection from './homepageSections/TestimonialsSection';

const Getstartpage = () => {
  // Giả lập trạng thái đăng nhập để bạn có thể thấy cả 2 giao diện
<<<<<<< HEAD

  return (
    <div className="homepage-container">

      <HeroSection />
      <DashboardSection isLoggedIn={false} />
=======
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="homepage-container">
      {/* Nút giả lập để chuyển đổi trạng thái đăng nhập */}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="temp-login-toggle">
        {isLoggedIn ? 'Xem với tư cách Khách' : 'Xem với tư cách Thành viên'}
      </button>

      <HeroSection />
      <DashboardSection isLoggedIn={isLoggedIn} />
>>>>>>> d90d751d45a1aadbefd0c0b038732c854d0d40aa
      <ChallengesSection />
      <CategoriesSection />
      <NewsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Getstartpage;