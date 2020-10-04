import Knex from "knex";

export async function up(knex: Knex) {
  knex.schema.dropTable("users");
  return knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable();
    table.boolean("isAdmin").notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}
