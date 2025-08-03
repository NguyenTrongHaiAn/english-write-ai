// src/components/LandingPage.jsx

import React from 'react';
/* import './LandingPage.css'; // Chúng ta sẽ tạo file này ở bước tiếp theo */

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Nâng trình Tiếng Anh của bạn với AI</h1>
        <p>
          Chấm điểm bài viết IELTS, CV và mọi văn bản khác. Nhận gợi ý chi tiết để viết hay hơn, đúng hơn và chuyên nghiệp hơn.
        </p>
        <button className="cta-button">
          Bắt đầu ngay
        </button>
      </div>
    </div>
  );
}

export default LandingPage;