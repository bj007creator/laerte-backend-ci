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
      client_id
    } = request.body;

    const res = await knex('solicitations').insert({
      message,
      state,
      service_id,
      client_name,
      client_id
    });

    return response.json(res);
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

      const retrieveSolicitations = await knex("solicitations").select('*');

      const retrieveSerializedSolicitations = retrieveSolicitations.filter( (solicitation: any) => solicitation.client_id === retrieveUser.id );
      return response.json(retrieveSerializedSolicitations);
      
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