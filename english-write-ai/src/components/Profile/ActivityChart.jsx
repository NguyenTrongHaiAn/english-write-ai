import React from 'react';

function ActivityChart() {
  return (
    <div className="activity-chart-card">
      <h4>Submissions in the past one year</h4>
      <div className="heatmap-placeholder">
        {/* Bạn có thể vẽ một lưới ô vuông xám bằng CSS Grid hoặc Flexbox */}
        <p>Bắt đầu giải bài, hoạt động của bạn sẽ được hiển thị ở đây!</p>
      </div>
      <div className="activity-summary">
        <span>Total active days: 0</span>
        <span>Max streak: 0</span>
      </div>
    </div>
  );
}

export default ActivityChart;