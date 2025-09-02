// // src/components/pages/ProfilePage
// import React, { useState, useEffect } from 'react';
// import ProfileHeader from '../components/Profile/ProfileHeader';
// import StatsCard from '../components/Profile/StatsCard';
// import ActivityChart from '../components/Profile/ActivityChart';
// import RecentSubmissions from '../components/Profile/RecentSubmissions';
// import CommunityStats from '../components/Profile/CommunityStats';
// import '../components/Profile/ProfilePage.css';

// function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ProfilePage.jsx

// useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Lấy token từ localStorage

//         if (!token) {
//           // Xử lý trường hợp không có token (ví dụ: điều hướng về trang login)
//           setLoading(false);
//           console.error("Không tìm thấy token xác thực.");
//           return;
//         }

//         const response = await fetch('/api/user/profile', {
//           headers: {
//             // Gửi token trong header Authorization
//             'Authorization': `Bearer ${token}` 
//           }
//         });
        
//         // Kiểm tra nếu response không thành công (vd: token hết hạn)
//         if (!response.ok) {
//             throw new Error('Lấy dữ liệu hồ sơ thất bại');
//         }

//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error("Lỗi:", error);
//         setUser(null); // Set user về null nếu có lỗi
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
// }, []);

//   if (loading) return <div>Đang tải...</div>;
//   if (!user) return <div>Không tìm thấy người dùng.</div>;

//   return (
//     <div className="profile-page">
//       <div className="left-column">
//         {/* Chỉ ProfileHeader cần dữ liệu thật lúc này */}
//         <ProfileHeader username={user.username} />
//         <CommunityStats />
//       </div>
//       <div className="right-column">
//         {/* Các component còn lại là tĩnh */}
//         <StatsCard />
//         <ActivityChart />
//         <RecentSubmissions />
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;

// File: src/pages/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 1. Import axios
import { useAuth } from '../context/AuthContext.jsx'; // 2. Import useAuth

// Import các component con của bạn (đảm bảo đường dẫn đúng)
// import ProfileHeader from '../components/Profile/ProfileHeader';
// ... các component khác ...

// Import file CSS (đảm bảo đường dẫn đúng)
// import '../components/Profile/ProfilePage.css';

// Component mẫu để thay thế, bạn có thể dùng lại component cũ của mình
const ProfileHeader = ({ username }) => <h2>Welcome, {username}!</h2>;
const CommunityStats = () => <div>Community Stats Placeholder</div>;
const StatsCard = () => <div>Stats Card Placeholder</div>;
const ActivityChart = () => <div>Activity Chart Placeholder</div>;
const RecentSubmissions = () => <div>Recent Submissions Placeholder</div>;


function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 3. Lấy token từ AuthContext (an toàn và nhất quán)
  const { token } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      // Đảm bảo có token trước khi gọi API
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        // 4. Gọi API đến đúng địa chỉ backend bằng axios
        const response = await axios.get('http://localhost:3001/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // 5. Gán đúng dữ liệu vào state (response.data.user)
        setProfile(response.data.user);

      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(err.response?.data?.message || 'Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]); // Chạy lại khi token thay đổi

  if (loading) return <div style={{paddingTop: '100px', textAlign: 'center'}}>Loading...</div>;
  if (error) return <div style={{paddingTop: '100px', textAlign: 'center', color: 'red'}}>Error: {error}</div>;
  if (!profile) return <div style={{paddingTop: '100px', textAlign: 'center'}}>User not found.</div>;

  return (
    <div className="profile-page" style={{paddingTop: '100px'}}>
      <div className="left-column">
        {/* 6. Truyền đúng prop (profile.fullName) */}
        <ProfileHeader username={profile.fullName} />
        <CommunityStats />
      </div>
      <div className="right-column">
        <StatsCard />
        <ActivityChart />
        <RecentSubmissions />
      </div>
    </div>
  );
}

export default ProfilePage;
