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

  return (
    <div className="homepage-container">

      <HeroSection />
      <DashboardSection isLoggedIn={false} />

      <ChallengesSection />
      <CategoriesSection />
      <NewsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Getstartpage;