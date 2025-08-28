const e = require("cors");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  const result= knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // Primary key = id SERIAL PRIMARY KEY
    table.string('email').notNullable().unique(); // Unique email kiểu chuỗi, không được để trống, và duy nhất.
    table.string('password').notNullable(); // Password field kiểu chuỗi, không để trống.Dùng để lưu mật khẩu đã mã hóa (hash), không phải plain text.
    table.string('full_name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp for creation  Mặc định sẽ lấy thời gian hiện tại khi bản ghi được tạo.
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp for last update Dùng để theo dõi lần chỉnh sửa gần nhất của bản ghi.
  });
  console.log(result); //will see it is a promise
  return result; // Return the promise to create the table
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // rollback the migration by dropping the users table
   return knex.schema.dropTable('users');
};

// After changing, run this command if you want to use the uo function.
// npx knex migrate:latest
//After changing, run this command if you want to use the down function.
// npx knex migrate:rollback 
