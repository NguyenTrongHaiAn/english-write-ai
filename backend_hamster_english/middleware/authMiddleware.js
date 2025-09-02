// File: middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // 1. Lấy token từ header 'Authorization'
    const authHeader = req.headers['authorization'];

    // Header thường có dạng: "Bearer TOKEN_CUA_BAN"
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Kiểm tra xem token có tồn tại không
    if (token == null) {
        // 401 Unauthorized: Yêu cầu thiếu thông tin xác thực
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    // 3. Xác thực và giải mã token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // 403 Forbidden: Token không hợp lệ hoặc đã hết hạn
            return res.status(403).json({ message: 'Token is not valid.' });
        }

        // 4. Nếu token hợp lệ, gán payload đã giải mã vào req.user
        // `user` ở đây sẽ là object { userId: ..., email: ... } mà chúng ta đã tạo
        req.user = user;

        // 5. Cho phép request đi tiếp đến bước tiếp theo (controller)
        next();
    });
};

module.exports = authMiddleware;