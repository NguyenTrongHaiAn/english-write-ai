import React from 'react';

const testimonials = [
    { quote: "Nhờ trang web này, mình đã tự tin hơn hẳn khi viết CV và đã nhận được lời mời phỏng vấn!", author: "Nguyễn Văn A" },
    { quote: "Các bài mẫu và phân tích IELTS Task 2 cực kỳ chi tiết, giúp mình cải thiện điểm số rõ rệt.", author: "Trần Thị B" },
    { quote: "Tính năng chấm điểm tự động đã chỉ ra những lỗi sai ngữ pháp mà mình không hề nhận ra.", author: "Lê C" },
];

const TestimonialsSection = () => (
    <section className="home-section testimonials-section">
        <h2>Học viên của chúng tôi nói gì?</h2>
        <div className="testimonials-grid">
            {testimonials.map((item, index) => (
                <blockquote key={index} className="testimonial-card">
                    <p>"{item.quote}"</p>
                    <footer>— {item.author}</footer>
                </blockquote>
            ))}
        </div>
    </section>
);

export default TestimonialsSection;