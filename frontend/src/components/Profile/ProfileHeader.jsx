import React from 'react';

// Bạn có thể import một ảnh đại diện mặc định từ source code của bạn

function ProfileHeader({ username }) {
  return (
    <div className="profile-header">
      <img src="/assets/default-avartar.png" alt="Avatar" className="avatar" />
      <div className="profile-info">
        <h2>{username}</h2>
        <p>Rank: Chưa có xếp hạng</p>
      </div>
    </div>
  );
}

export default ProfileHeader;