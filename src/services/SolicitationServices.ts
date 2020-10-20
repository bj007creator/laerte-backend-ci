import { Request, Response } from "express";

import knex from "../database/connection";

export default class SolicitationServices {
  static async store({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    const {
      message,
      state,
      service_id,
      client_name,
    } = request.body;

    knex.transaction(function(trx) {
      knex('solicitations').transacting(trx).insert({
        message,
        state,
        service_id,
        client_name
      })
      .then(function(resp) {
          const solicitation_id = resp[0];

          return trx('users_solicitations').insert({ user_id: request.userId, solicitation_id });
      })
      .then(trx.commit)
      .catch(trx.rollback);
    })
    .then(function(resp) {
        console.log('Transaction complete.');
        return response.json(resp);
    })
    .catch(function(err) {
        console.error(err);
        return response.status(409).send();
    });
  }

  static async index({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    try{
      const retrieveUser = await knex("users").where('id', request.userId).first();

      if (retrieveUser.isAdmin) {
        const retrieveSolicitations = await knex("solicitations").select('*');
        return response.json(retrieveSolicitations);
      }
      const retrieveSolicitations = await knex("solicitations")
                                          .join('users_solicitations', 'solicitations.id', '=', 'users_solicitations.solicitation_id')
                                          .where('users_solicitations.user_id', request.userId)
                                          .distinct()
                                          .select('solicitations.*');
                                          
      return response.json(retrieveSolicitations);
    } catch {
      return response.status(404).send();
    }
  }

  static async update({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    const { id } = request.params;
    const { state } = request.body;
    try{
      const user = await knex("users").where("id", request.userId).first();
      if(user.isAdmin){
        await knex("solicitations").where("id", id).update({
          state
        });
        return response.json({ state });
      }
      return response.status(401).send();
    } catch {
      return response.status(401).send();
    }
  }
}