const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;
     //đang viết middleware trong Express, mà Express tự động gọi hàm này với 3 đối số:
        //(req, res, next)ne
     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
       

      // 2. Lấy token ra khỏi header (loại bỏ chữ 'Bearer ')
      token = req.headers.authorization.split(' ')[1];

      // 3. Dùng jwt.verify() để kiểm tra và giải mã token
      // Đây là lúc "bảo vệ" dùng "chữ ký bí mật" để kiểm tra thẻ
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Nếu token hợp lệ, lấy thông tin user từ token (decoded.userId)
      // và gắn nó vào đối tượng `req` để các hàm xử lý phía sau có thể dùng
      req.user = { id: decoded.userId }; // Gắn thông tin người dùng vào request

      // 5. Cho phép yêu cầu đi tiếp đến trạm xử lý tiếp theo
      next();
    } catch (error) {
      console.error('Lỗi xác thực token:', error);
      res.status(401).json({ message: 'Xác thực thất bại, token không hợp lệ.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Xác thực thất bại, không tìm thấy token.' });
  }
};

module.exports = { protect };
