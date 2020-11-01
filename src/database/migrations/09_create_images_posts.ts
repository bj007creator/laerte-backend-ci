import Knex from 'knex';

export async function up(knex : Knex) {
    return  knex.schema.createTable('images_posts', table => {
                table.increments('id').primary();
                table.integer('image_id')
                    .notNullable()
                    .references('id')
                    .inTable('images');//esse comando garante que cada point_id é um id válido na tabela points
                table.integer('post_id')
                    .notNullable()
                    .references('id')
                    .inTable('posts');
            });
}
export async function down(knex : Knex) {
    return knex.schema.dropTable('images_posts');
}