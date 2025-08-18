// File: middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Xác thực thất bại, không tìm thấy token.' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // --- ĐÂY LÀ THAY ĐỔI QUAN TRỌNG ---
        // Đọc `userId` từ payload và tạo object `req.user`
        req.user = { id: decoded.userId }; 
        // ------------------------------------
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Xác thực thất bại, token không hợp lệ.' });
    }
};

module.exports = authMiddleware;