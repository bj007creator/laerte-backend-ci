import Knex from 'knex';

export async function up(knex : Knex) {
    return  knex.schema.createTable('users_solicitations', table => {
                table.increments('id').primary();
                table.integer('user_id')
                    .notNullable()
                    .references('id')
                    .inTable('users');//esse comando garante que cada point_id é um id válido na tabela points
                table.integer('solicitation_id')
                    .notNullable()
                    .references('id')
                    .inTable('solicitations');
            });
}
export async function down(knex : Knex) {
    return knex.schema.dropTable('users_solicitations');
}