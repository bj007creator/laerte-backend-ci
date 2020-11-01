import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("videos", table => {
    table.increments("id").primary();
    table.string("inserted_date").notNullable();
    table.string("video_url").notNullable();
    table.string("height").notNullable();
    table.string("width").notNullable();
    table.string("align").notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("videos");
}
