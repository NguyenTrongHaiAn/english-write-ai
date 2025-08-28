// File: routes/authRoutes.js

const express = require('express');
const router = express.Router();

// 1. Import toàn bộ controller
const authController = require('../controllers/authController.js');

// 2. Sử dụng các hàm từ object controller đã import
// Đảm bảo authController.registerUser, authController.loginUser, authController.verifyEmail 
// đều là các hàm đã được export từ file authController.js

// Route để đăng ký
router.post('/register', authController.registerUser);

// Route để đăng nhập
router.post('/login', authController.loginUser);

// Route để xác thực email
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;