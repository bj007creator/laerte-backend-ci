import { Request, Response } from "express";

import knex from "../database/connection";
import Utils from "../utils/Utils";

const utils = new Utils();

export default class UsersServices {
  /*Users listll*/
  users = [
    "Mateus",
    "Henrique",
    "Supimpa",
    "Legal",
    "Tunel",
    "carrosel",
    "textel"
  ];

  async index({ request, response }: { request: Request; response: Response }) {
    const retrieveUsers = await knex("users").select("*");
    return response.json(retrieveUsers);

    /*const { search } = request.query;
        response.json( search === undefined ? 
            this.users : 
            this.users.filter(user => {
                return user.toUpperCase().includes(search.toString().toUpperCase());
        }));*/
  }
  show({ request, response }: { request: Request; response: Response }) {
    const { id } = request.params;
    return this.users[Number(id)]
      ? response.json({ user: this.users[Number(id)] })
      : response.status(404).send("Not Found");
  }
  static async store({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    const { email, password, name } = request.body;

    const userExists = await knex("users")
      .where("email", email)
      .first();

    if (!userExists) {
      const user = {
        email,
        password: utils.passwordEncrypt(password),
        name
      };

      await knex("users").insert(user);

      return response.json(user);
    }
    return response.status(409).send();
  }
}
