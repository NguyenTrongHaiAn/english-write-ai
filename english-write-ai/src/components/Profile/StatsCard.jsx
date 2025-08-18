import React from 'react';

function StatsCard() {
  return (
    <div className="stats-card">
      <div className="solved-summary">
        {/* Vòng tròn có thể là một div được bo tròn bằng CSS */}
        <div className="progress-circle">
          <span className="solved-count">0 / 3000+</span>
          <span className="solved-label">Solved</span>
        </div>
      </div>
      <div className="difficulty-stats">
        <p>Easy: <strong>0</strong> / 890</p>
        <p>Medium: <strong>0</strong> / 1897</p>
        <p>Hard: <strong>0</strong> / 860</p>
      </div>
    </div>
  );
}

export default StatsCard;