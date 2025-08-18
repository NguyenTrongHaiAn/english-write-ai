// File: backend_hamster_english/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Đảm bảo mỗi email là duy nhất
    },
    password: {
        type: String,
        required: true,
    },
    // Bạn có thể thêm các trường khác ở đây sau này
    // ví dụ: avatar, dateCreated, etc.
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

// 'User' là tên của model, Mongoose sẽ tự động tạo collection tên là 'users' trong MongoDB
module.exports = mongoose.model('User', userSchema);