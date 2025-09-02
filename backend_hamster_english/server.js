// File: server.js

// Dòng này phải ở trên cùng để nạp các biến môi trường
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import các file routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Khởi tạo ứng dụng Express
const app = express();

// Sử dụng các middleware cần thiết
app.use(cors()); // Cho phép các request từ domain khác (ví dụ: từ frontend)
app.use(express.json()); // Giúp server đọc được dữ liệu JSON từ request body

// Đăng ký các routes
// Tất cả các route trong authRoutes sẽ có tiền tố /api/auth
app.use('/api/auth', authRoutes);

// Tất cả các route trong userRoutes sẽ có tiền tố /api/users
app.use('/api/users', userRoutes);

// Lấy cổng từ file .env hoặc dùng cổng 3001 làm mặc định
const PORT = process.env.PORT || 3001;

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});