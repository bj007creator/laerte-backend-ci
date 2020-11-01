import { Request, Response } from "express";

import knex from "../database/connection";

class PostsServices {
  static async store({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    const {
      likes,
      deslikes,
      image,
      content,
      title
    } = request.body;

    const date = new Date();
    const inserted_date = JSON.stringify({
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      day: date.getUTCDate(),
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes(),
      seconds: date.getUTCSeconds(),
      milliseconds: date.getUTCMilliseconds(),
    });

    try{
      const post = await knex("posts").where("title", title).first();
      const user = await knex("users").where("id", request.userId).first();
      if(!post && user.isAdmin){
        const insertedId = await knex("posts").insert({
          likes,
          deslikes,
          image,
          content,
          title,
          inserted_date
        });
        return response.json(insertedId);
      }
      return response.status(401).send();
    } catch {
      return response.status(409).send();
    }
  }

  static async index({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    try{
      const retrievePosts = await knex("posts").select("*");
      return response.json(retrievePosts);
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
        await knex("posts").where("id", id).del();
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
    const {
      likes,
      deslikes,
      image,
      content,
      title
    } = request.body;
    try{
      const user = await knex("users").where("id", request.userId).first();
      if(user.isAdmin){
        await knex("posts").where("id", id).update({
          image,
          content,
          title
        });
        return response.json({ image, content, title });
      } else {
        await knex("posts").where("id", id).update({
          likes,
          deslikes
        });
        return response.json({ likes, deslikes });
      }
    } catch {
      return response.status(401).send();
    }
  }
}

export default PostsServices;