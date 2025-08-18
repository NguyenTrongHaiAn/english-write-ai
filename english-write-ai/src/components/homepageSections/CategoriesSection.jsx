import React from 'react';

const categories = [
    { title: "Luyện thi IELTS", desc: "Chinh phục bài thi Writing với chiến lược và bài mẫu chi tiết.", icon: "📈" },
    { title: "Viết cho Công việc", desc: "Soạn thảo CV, email, báo cáo chuyên nghiệp và hiệu quả.", icon: "💼" },
    { title: "Viết Học thuật", desc: "Viết các bài luận ấn tượng để đạt kết quả cao trong học tập.", icon: "🎓" },
    { title: "Viết Sáng tạo", desc: "Khơi nguồn cảm hứng và xây dựng nội dung số độc đáo.", icon: "💡" },
];

const CategoriesSection = () => (
    <section className="home-section categories-section">
        <h2>Khám phá Chuyên mục</h2>
        <div className="categories-grid">
            {categories.map((cat, index) => (
                <div key={index} className="category-card">
                    <div className="category-icon">{cat.icon}</div>
                    <h3>{cat.title}</h3>
                    <p>{cat.desc}</p>
                    <a href="#">Xem chi tiết →</a>
                </div>
            ))}
        </div>
    </section>
);

export default CategoriesSection;