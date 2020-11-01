import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("posts", table => {
    table.increments("id").primary();
    table.string("inserted_date").notNullable();
    table.integer("likes").notNullable();
    table.integer("deslikes").notNullable();
    table.string("title").notNullable();
    table.string("content").notNullable();
    table.string("image").notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("posts");
}
