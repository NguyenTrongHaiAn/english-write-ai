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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="homepage-container">
      {/* Nút giả lập để chuyển đổi trạng thái đăng nhập */}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="temp-login-toggle">
        {isLoggedIn ? 'Xem với tư cách Khách' : 'Xem với tư cách Thành viên'}
      </button>

      <HeroSection />
      <DashboardSection isLoggedIn={isLoggedIn} />
      <ChallengesSection />
      <CategoriesSection />
      <NewsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Getstartpage;