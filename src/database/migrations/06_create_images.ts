import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("images", table => {
    table.increments("id").primary();
    table.string("inserted_date").notNullable();
    table.string("image_url").notNullable();
    table.string("height").notNullable();
    table.string("width").notNullable();
    table.string("align").notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("images");
}
