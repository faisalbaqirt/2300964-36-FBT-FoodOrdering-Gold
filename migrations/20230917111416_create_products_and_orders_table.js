/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  //membuat tabel products
  return knex.schema.createTable('products', function(table) {
    table.increments('id').primary().unique();
    table.string('name', 255).notNullable().unique();
    table.string('description', 255);
    table.decimal('price', 20);
  })
  //membuat tabel orders
  .createTable('orders', function(table) {
    table.increments('id').primary();
    table.timestamp('datetime').defaultTo(knex.raw('timezone(\'Asia/Jakarta\', now())')).notNullable();
    table.integer('product_id').unsigned().references('id').inTable('products');
    table.string('product_name', 255).unsigned().references('name').inTable('products');
    table.decimal('quantity', 20);
    table.decimal('total_amount', 20);
    table.string('name', 255).notNullable();
    table.decimal('telephone', 20);
    table.string('address', 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('orders')
    .dropTable('products');
};
