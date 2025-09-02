import React, { useState } from 'react';
import './getstartpage.css';

import DashboardSection from './homepageSections/DashboardSection';
import ChallengesSection from './homepageSections/ChallengesSection';
const Getstartpage = () => {
  // Giả lập trạng thái đăng nhập để bạn có thể thấy cả 2 giao diện

  return (
    <div className="homepage-container">

      
      <DashboardSection isLoggedIn={false} />

      <ChallengesSection />
     
    </div>
  );
};

export default Getstartpage;