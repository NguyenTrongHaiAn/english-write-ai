// File: routes/userRoutes.js

const express = require('express');
const router = express.Router();

// Import các công cụ cần thiết
const authMiddleware = require('../middleware/authMiddleware');
const knexConfig = require('../knexfile'); 
const knex = require('knex')(knexConfig.development);

/**
 * @route   GET /api/users/profile
 * @desc    Lấy thông tin của người dùng đã được xác thực (đang đăng nhập)
 * @access  Private (Yêu cầu token)
 */
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // Middleware `authMiddleware` đã giải mã token và gán thông tin vào `req.user`.
        // Dữ liệu trong token của chúng ta là { userId: ..., email: ... }
        const userId = req.user.userId; 

        // Truy vấn database để lấy thông tin người dùng bằng ID
        const user = await knex('users')
            .where({ id: userId })
            .select('id', 'full_name', 'email') // Chỉ chọn các cột an toàn để trả về
            .first(); // .first() để đảm bảo chỉ nhận về một object, không phải một mảng

        // Nếu không tìm thấy người dùng (trường hợp hiếm, ví dụ user vừa bị xóa)
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Định dạng lại dữ liệu trả về cho nhất quán với Frontend
        const userProfile = {
            id: user.id,
            fullName: user.full_name,
            email: user.email
        };

        // Trả về dữ liệu trong một object có key là 'user',
        // khớp với cách Frontend đang đọc: response.data.user
        res.status(200).json({ user: userProfile });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error while fetching profile.' });
    }
});

module.exports = router;