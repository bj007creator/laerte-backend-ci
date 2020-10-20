import { Request, Response } from "express";

import knex from "../database/connection";

export default class ProfileServices {
  
  static async retrieveUserData({ request, response }: { request: Request; response: Response }) {
    try {
      const user = await knex("users")
      .where("id", request.userId)
      .first();

      delete user.password;

      return response.json({user});
    } catch{
      return response.status(401).send();
    }
    
  }
}
