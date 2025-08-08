// Import Knex để tương tác với DB. Chúng ta cần đường dẫn đến knexfile.
const knexConfig = require('../knexfile'); 
const knex = require('knex')(knexConfig.development);
// Import thư viện mã hóa mật khẩu
const bcrypt = require('bcryptjs');

// Import thư viện tạo JSON Web Token (JWT) tạo token để xác thực người dùng
const jwt = require('jsonwebtoken');

// ĐĂNG KÝ NGƯỜI DÙNG
//đánh dấu hàm này là hàm bất đồng bộ để có thể sử dụng await bên trong
const registerUser = async (req, res) => {
   const { fullName, email,password } = req.body;

   if (!fullName || !email || !password) {
//400 là mã lỗi chuẩn trong HTTP, có nghĩa là:
// Bad Request – Yêu cầu của client không hợp lệ (ví dụ: thiếu dữ liệu, sai định dạng,...).
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
   }
   try{
      //tạo chuỗi băm mật khẩu
      //await đợi  ,bcrypt.hash mã hóa mật khẩu với độ khó là 10 (salt rounds)
      const hashedPass=await bcrypt.hash(password,10);
      //kiểm tra xem email đã tồn tại trong bảng users chưa
      const exitstingUser=await knex('users').where({email}).first();
      //nếu email đã tồn tại, trả về lỗi 409 (Conflict)
      if (exitstingUser) {
         return res.status(400).json({message:'email already exists'})
      }
      //thêm người dùng mới vào bảng users
       const [newUser]=await knex('users')
         .insert({ full_name: fullName, email, password: hashedPass })
         .returning(['id','email','full_name']);
      //gửi phản hồi thành công với thông tin người dùng mới
        //sinh ra token sau khi đăng ký thành công
      const token=jwt.sign({
         userId:newUser.id,
         email:newUser.email
      },process.env.JWT_SECRET, {expiresIn: '1h'}); //token sẽ hết hạn sau 1 giờ
      
      return res.status(201).json(
   {
         message: 'Registered successfully',
         user: newUser,
         token: token //trả về token trong phản hồi
   }
      );

   
   } catch (error){
      //nếu có lỗi xảy ra trong quá trình mã hóa mật khẩu, trả về lỗi 500
      return res.status(500).json({message: 'error when registering user', error: error.message});
//error (bên trái)	Tên trường trong JSON gửi về client (bạn đặt tên gì cũng được)
// error.message	Là nội dung thông báo lỗi chi tiết từ hệ thống (ví dụ: "Cannot read property of undefined")
// error.message là một chuỗi mô tả lỗi, nằm sẵn trong đối tượng error mà catch (error) nhận được.
   }
}

//lOGIN NGƯỜI DÙNG
const loginUser = async (req, res) => {
   const { email, password } = req.body;
   
   if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
   }
   try {
      //kiểm tra xem email có tồn tại trong bảng users không
      const existingUser = await knex('users').where({ email }).first();
      //nếu không tìm thấy người dùng, trả về lỗi 404 (Not Found)
      if (!existingUser) {
         return res.status(404).json({ message: 'User does not exist.' });
      }
      //so sánh mật khẩu người dùng nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      //nếu mật khẩu không hợp lệ, trả về lỗi 401 (Unauthorized)
      if (!isPasswordValid) {
         return res.status(401).json({ message: 'Invalid password.' });
      }
      //nếu mật khẩu hợp lệ, tạo token cho người dùng
      const token = jwt.sign(
         { userId: existingUser.id, email: existingUser.email },
         process.env.JWT_SECRET,
         { expiresIn: '1h' } //token sẽ hết hạn sau 1 giờ
      );
      //trả về thông tin người dùng và token
      return res.status(200).json({
         message: 'Login successful',
         user: {
            id: existingUser.id,
            fullName: existingUser.full_name,
            email: existingUser.email
         },
         token: token
      });
   }
   catch (error) {
      //nếu có lỗi xảy ra trong quá trình đăng nhập, trả về lỗi 500
      return res.status(500).json({ message: 'Error when logging in user', error: error.message });
   };
}
//trong hệ thống dùng JWT thì logout thường liên quan đến token.
//NGHIÊN CỨU TOKEN VÀ LÀM
//LOGOUT NGƯỜI DÙNG
// ... (code của các hàm registerUser, loginUser, forgotPassword ở trên)

// DÒNG CUỐI CÙNG CỦA FILE
module.exports = {
    registerUser,
    loginUser,
   //  logouUser,
   //  forgotPassword,
};