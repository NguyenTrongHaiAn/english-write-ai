import React from 'react';

const challenges = [
  { type: 'IELTS Task 2', title: "Some people think that technology is making people more sociable. To what extent do you agree or disagree?" },
  { type: 'Viết cho công việc', title: "Tình huống: Viết một email chuyên nghiệp để xin nghỉ phép 2 ngày." },
  { type: 'Viết sáng tạo', title: "Viết một đoạn văn ngắn bắt đầu bằng câu: 'Tiếng chuông cửa vang lên vào đúng nửa đêm.'" },
];

const topAuthors = [
    { name: 'Minh Anh', score: 1520 },
    { name: 'Trần Hùng', score: 1480 },
    { name: 'Lê Thu', score: 1350 },
    { name: 'Phạm Huy', score: 1200 },
    { name: 'Hoàng Yến', score: 1150 },
];

const ChallengesSection = () => (
  <section className="home-section challenges-section">
    <div className="challenges-main-column">
      <h2>Thử thách Nổi bật trong Tuần</h2>
      <div className="challenges-list">
        {challenges.map((challenge, index) => (
          <div key={index} className="challenge-card">
            <span className="challenge-type">{challenge.type}</span>
            <p>{challenge.title}</p>
            <button>Bắt đầu Viết</button>
          </div>
        ))}
      </div>
    </div>
    <div className="challenges-sidebar">
      <h3>Top 5 Tác giả của Tuần</h3>
      <ol className="leaderboard-list">
        {topAuthors.map((author, index) => (
            <li key={index}>
                <span className="rank">{index + 1}</span>
                <span className="author-name">{author.name}</span>
                <span className="author-score">{author.score}</span>
            </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ChallengesSection;