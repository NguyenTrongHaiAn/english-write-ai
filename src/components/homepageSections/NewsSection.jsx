import React from 'react';

const posts = [
    { title: "Tính năng mới: Phân tích Tông giọng (Tone Analysis) đã ra mắt!", category: "Cập nhật sản phẩm" },
    { title: "5 Cấu trúc câu 'ăn điểm' trong IELTS Writing Task 2", category: "Kiến thức" },
    { title: "Câu chuyện: Tăng 1.5 band điểm Writing trong 2 tháng", category: "Thành công" },
];

const NewsSection = () => (
    <section className="home-section news-section">
        <h2>Tin tức & Bài viết Hữu ích</h2>
        <div className="news-grid">
            {posts.map((post, index) => (
                <div key={index} className="news-card">
                    <div className="news-image-placeholder"></div>
                    <span className="news-category">{post.category}</span>
                    <h3>{post.title}</h3>
                    <a href="#">Đọc thêm...</a>
                </div>
            ))}
        </div>
        <button className="view-all-btn">Xem tất cả bài viết</button>
    </section>
);

export default NewsSection;