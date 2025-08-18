// src/components/pages/ProfilePage
import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/Profile/ProfileHeader';
import StatsCard from '../components/Profile/StatsCard';
import ActivityChart from '../components/Profile/ActivityChart';
import RecentSubmissions from '../components/Profile/RecentSubmissions';
import CommunityStats from '../components/Profile/CommunityStats';
import '../components/Profile/ProfilePage.css';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ProfilePage.jsx

useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage

        if (!token) {
          // Xử lý trường hợp không có token (ví dụ: điều hướng về trang login)
          setLoading(false);
          console.error("Không tìm thấy token xác thực.");
          return;
        }

        const response = await fetch('/api/user/profile', {
          headers: {
            // Gửi token trong header Authorization
            'Authorization': `Bearer ${token}` 
          }
        });
        
        // Kiểm tra nếu response không thành công (vd: token hết hạn)
        if (!response.ok) {
            throw new Error('Lấy dữ liệu hồ sơ thất bại');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Lỗi:", error);
        setUser(null); // Set user về null nếu có lỗi
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
}, []);

  if (loading) return <div>Đang tải...</div>;
  if (!user) return <div>Không tìm thấy người dùng.</div>;

  return (
    <div className="profile-page">
      <div className="left-column">
        {/* Chỉ ProfileHeader cần dữ liệu thật lúc này */}
        <ProfileHeader username={user.username} />
        <CommunityStats />
      </div>
      <div className="right-column">
        {/* Các component còn lại là tĩnh */}
        <StatsCard />
        <ActivityChart />
        <RecentSubmissions />
      </div>
    </div>
  );
}

export default ProfilePage;
