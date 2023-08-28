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
    table.decimal('price').notNullable();
  })
  //membuat tabel orders
  .createTable('orders', function(table) {
    table.increments('id').primary();
    table.timestamp('datetime').defaultTo(knex.fn.now());
    table.integer('product_id').unsigned().references('id').inTable('products');
    table.string('product_name', 255).unsigned().references('name').inTable('products');
    table.decimal('quantity').notNullable();
    table.decimal('total_amount').notNullable();
    table.string('name', 255).notNullable();
    table.decimal('telephone').notNullable();
    table.string('address', 255).notNullable();
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
