// File: migrations/xxxx_reset_token.js (file cũ dùng để thêm token)

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    // Cột để lưu token reset mật khẩu
    table.string('password_reset_token'); 
    // Cột để lưu thời gian token sẽ hết hạn
    table.timestamp('password_reset_expires'); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // Hành động ngược lại là xóa 2 cột này
  return knex.schema.table('users', function(table) {
    table.dropColumn('password_reset_token');
    table.dropColumn('password_reset_expires');
  });
};