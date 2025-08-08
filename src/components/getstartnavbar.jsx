// src/components/getstartnavbar.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './getstartnavbar.css';

// Dữ liệu mới, chi tiết và có tổ chức
const navData = [
  {
    title: 'Luyện thi IELTS',
    subItems: [
      { title: 'Writing Task 1', path: '/skills/ielts/writing-task-1' },
      { title: 'Writing Task 2', path: '/skills/ielts/writing-task-2' },
      { title: 'Thử thách Giả lập', path: '/skills/ielts/full-test-challenge' },
    ],
  },
  {
    title: 'Viết cho Công việc',
    subItems: [
      { title: 'CV & Thư xin việc', path: '/skills/professional/cv-cover-letter' },
      { title: 'Email chuyên nghiệp', path: '/skills/professional/email' },
      { title: 'Hồ sơ LinkedIn', path: '/skills/professional/linkedin' },
      { title: 'Báo cáo & Thuyết trình', path: '/skills/professional/reports' },
    ],
  },
  {
    title: 'Viết Học thuật',
    subItems: [
      { title: 'Bài luận cá nhân (Personal Statement)', path: '/skills/academic/personal-statement' },
      { title: 'Luận văn (Academic Essays)', path: '/skills/academic/essays' },
      { title: 'Tóm tắt Nghiên cứu (Abstract)', path: '/skills/academic/abstract' },
    ],
  },
  {
    title: 'Viết Sáng tạo & Nội dung số',
    subItems: [
      { title: 'Bài đăng Blog & Mạng xã hội', path: '/skills/creative/blog-social' },
      { title: 'Truyện ngắn', path: '/skills/creative/short-story' },
      { title: 'Kịch bản & Diễn văn', path: '/skills/creative/script-speech' },
    ],
  },
];

// Phần logic và render JSX của component không cần thay đổi
const Getstartnavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`getstart-navbar ${isVisible ? 'visible' : 'hidden'}`}>
      {navData.map((item, index) => (
        <div key={index} className="nav-item-dropdown">
          <span className="nav-title-dropdown">{item.title}</span>
          <div className="dropdown-content">
            {item.subItems.map((subItem, subIndex) => (
              <Link key={subIndex} to={subItem.path} className="dropdown-link">
                {subItem.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default Getstartnavbar;