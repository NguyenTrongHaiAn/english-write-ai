// File: routes/userRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// --- ĐÂY LÀ THAY ĐỔI QUAN TRỌNG ---
// Import Knex thay vì Mongoose Model
const knexConfig = require('../knexfile'); 
const knex = require('knex')(knexConfig.development);
// ------------------------------------


// @route   GET /api/user/profile
// @desc    Lấy thông tin của người dùng đã đăng nhập
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // req.user.id bây giờ đã có giá trị đúng từ authMiddleware
        const userId = req.user.id;

        // --- SỬ DỤNG KNEX ĐỂ TRUY VẤN ---
        const user = await knex('users')
            .where({ id: userId })
            .select('id', 'full_name', 'email') // Chọn các cột muốn trả về, loại bỏ cột 'password'
            .first(); // .first() để lấy về 1 object thay vì 1 array
        // ------------------------------------

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }

        // Đổi tên 'full_name' thành 'fullName' cho nhất quán (tùy chọn)
        const userProfile = {
            id: user.id,
            username: user.full_name, // Đổi tên để khớp với frontend
            email: user.email
        };

        res.json(userProfile);

    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error.message);
        res.status(500).send('Lỗi Server');
    }
});

module.exports = router;