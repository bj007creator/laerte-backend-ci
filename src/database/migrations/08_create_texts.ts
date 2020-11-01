import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("texts", table => {
    table.increments("id").primary();
    table.string("inserted_date").notNullable();
    table.string("text_content").notNullable();
    table.string("size").notNullable();
    table.string("align").notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("texts");
}
