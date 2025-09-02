import React from 'react';

const DashboardSection = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <section className="home-section dashboard-section logged-in">
        <h2>Chào mừng trở lại, Anh!</h2>
        <div className="stats-grid">
          <div className="stat-card"><strong>Writing Streak</strong><span>🔥 5 ngày</span></div>
          <div className="stat-card"><strong>Tổng bài viết</strong><span>✍️ 12 bài</span></div>
          <div className="stat-card"><strong>Điểm trung bình</strong><span>📊 7.0</span></div>
        </div>
        <a href="#" className="continue-writing-link">Tiếp tục bài viết IELTS Task 2 đang dang dở →</a>
      </section>
    );
  }

  return (
    <section className="home-section dashboard-section guest">
      <h2>Luyện viết hiệu quả chỉ với 3 bước đơn giản</h2>
      <div className="steps-container">
        <div className="step-card"><span>1.</span><h3>Chọn Đề bài</h3><p>Từ ngân hàng đề thi đa dạng của chúng tôi.</p></div>
        <div className="step-card"><span>2.</span><h3>Hoàn thành Bài viết</h3><p>Trong môi trường giả lập thi thật.</p></div>
        <div className="step-card"><span>3.</span><h3>Nhận Phản hồi Tức thì</h3><p>Phân tích chi tiết từ ngữ pháp đến cấu trúc.</p></div>
      </div>
    </section>
  );
};

export default DashboardSection;