
const knexConfig = require('../knexfile'); 
const knex = require('knex')(knexConfig.development);

const getUserProfile = async (req, res) => {
    try {
        // Nhờ middleware `protect`, chúng ta đã có `req.user.id`
        const userId = req.user.userId;
        const user = await knex('users').where({ id: userId }).select('id', 'full_name', 'email').first();
        
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server.' });
    }
};

module.exports = { getUserProfile };