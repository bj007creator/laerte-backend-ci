import { Request, Response } from "express";

import knex from "../database/connection";

class TextsServices {
  static async store({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    const {
      text_content,
      size,
      align
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
      const user = await knex("users").where("id", request.userId).first();
      if(user.isAdmin){
        const insertedId = await knex("texts").insert({
          inserted_date,
          text_content,
          size,
          align
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
    const {
      post_id
    } = request.query;
    try{
      if(post_id){
        const retrieveTexts = await knex("texts")
                                    .join("texts_posts", "texts.id", "=", "texts_posts.text_id")
                                    .where("texts_posts.post_id", String(post_id))
                                    .distinct()
                                    .select("texts.*");
        return response.json(retrieveTexts);
      }
      const retrieveTexts = await knex("texts").select("*");
      return response.json(retrieveTexts);
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
        await knex("texts").where("id", id).del();
        await knex("texts_posts").where("text_id", id).del();
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
      text_content,
      size,
      align
    } = request.body;
    try{
      const user = await knex("users").where("id", request.userId).first();
      if(user.isAdmin){
        await knex("texts").where("id", id).update({
          text_content,
          size,
          align
        });
        return response.json({ 
          text_content,
          size,
          align
        });
      }
      return response.status(401).send();
    } catch {
      return response.status(401).send();
    }
  }

  static async addAttribute({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    const { id } = request.params;
    const { post_id } = request.body;

    try{
      const res = await knex("texts_posts").insert({
        text_id: id,
        post_id
      });
      return response.json(res);
    } catch {
      return response.status(401).send();
    }
  }
}

export default new TextsServices();