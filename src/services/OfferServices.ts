import { Request, Response } from "express";

import knex from "../database/connection";

export default class OfferServices {
  static async store({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    const { name } = request.body;

    try{
      const service = await knex("services").where("name", name).first();
      const user = await knex("users").where("id", request.userId).first();
      if(!service && user.isAdmin){
        await knex("services").insert({
          name
        });
        return response.json({ name });
      }
      return response.status(401).send();
    } catch {
      return response.status(409).send();
    }
  }

  static async retrieve({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    try{
      const retrieveServices = await knex("services").select("*");
      return response.json(retrieveServices);
    } catch {
      return response.status(404).send();
    }
  }

  static async destroy({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    const { id } = request.params;

    try{
      const user = await knex("users").where("id", request.userId).first();
      if(user.isAdmin){
        await knex("services").where("id", id).del();
        return response.status(200).send();
      }
      return response.status(401).send();
    } catch {
      return response.status(401).send();
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
    const { name } = request.body;
    try{
      const user = await knex("users").where("id", request.userId).first();
      if(user.isAdmin){
        await knex("services").where("id", id).update({
          name
        });
        return response.json({ name });
      }
      return response.status(401).send();
    } catch {
      return response.status(401).send();
    }
  }
}