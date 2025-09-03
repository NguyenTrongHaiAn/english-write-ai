const e = require("cors");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('topics', (table) => {
        table.increments('id').primary();
        table.text('prompt','longtext').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());

    })
    .createTable('submissions', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.integer('topic_id').unsigned().notNullable();
        table.foreign('topic_id').references('id').inTable('topics').onDelete('CASCADE');
        table.text('content', 'longtext').notNullable();
        table.integer('word_count');
        table.decimal('ai_band_score',2,1);
        table.text('ai_feedback','longtext');
        table.timestamp('submitted_at').defaultTo(knex.fn.now());
    });

};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // Khi rollback, xóa theo thứ tự ngược lại (submissions trước, topics sau)
  return knex.schema
    .dropTable('submissions')
    .dropTable('topics');
};