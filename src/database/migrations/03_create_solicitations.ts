import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("solicitations", table => {
    table.increments("id").primary();
    table.integer("state").notNullable();
    table.string("message").notNullable();
    table.integer("service_id").notNullable();
    table.string("client_name").notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("solicitations");
}
