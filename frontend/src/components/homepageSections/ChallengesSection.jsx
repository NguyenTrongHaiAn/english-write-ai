import React from 'react';
import { useNavigate } from 'react-router-dom';     // 1. Import useNavigate
import { useAuth } from '../../context/AuthContext.jsx'; // 2. Import useAuth để lấy thông tin đăng nhập
const challenges = [
  { type: 'IELTS Task 2', title: "Some people think that technology is making people more sociable. To what extent do you agree or disagree?" },
  { type: 'Viết cho công việc', title: "Tình huống: Viết một email chuyên nghiệp để xin nghỉ phép 2 ngày." },
  { type: 'Viết sáng tạo', title: "Viết một đoạn văn ngắn bắt đầu bằng câu: 'Tiếng chuông cửa vang lên vào đúng nửa đêm.'" },
];



const ChallengesSection = () => {
  const navigate = useNavigate(); 
 // 3. Khởi tạo useNavigate để chuyển hướng
  const { user } = useAuth(); // 4. Lấy thông tin người dùng từ context
  
  // Hàm xử lý khi người dùng nhấn nút "Start"
  const handleStartChallenge = (challengeId) => {  
    if (!user) {
      // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate('/login');
      return;
    }
    // Nếu đã đăng nhập, có thể xử lý logic bắt đầu thử thách
    console.log(`Starting challenge ${challengeId}`);
    navigate(`/writing/${challengeId}`);
    // Có thể thêm logic để bắt đầu thử thách, ví dụ: chuyển hướng đến trang chi tiết thử thách
  }

return (
  <section className="home-section challenges-section">
    <div className="challenges-main-column">
      <h2>Challenge</h2>
      <div className="challenges-list">
        {challenges.map((challenge, index) => (
          <div key={index} className="challenge-card">
            <span className="challenge-type">{challenge.type}</span>
            <p>{challenge.title}</p>
            <button onClick ={()=>handleStartChallenge(index)}>Start</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
}
export default ChallengesSection;