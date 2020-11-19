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
    const { content } = request.body;

    try{
      const user = await knex("users").where("id", request.userId).first();
      if(user){
        await knex("answers").insert({
          name: user.name,
          content,
        });
        return response.json({ name: user.name, content });
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
    const {
      post_id
    } = request.query;
    try{
      if(post_id){
        const retrieveAnswers = await knex("answers")
                                    .join("answers_posts", "answers.id", "=", "answers_posts.answer_id")
                                    .where("answers_posts.post_id", String(post_id))
                                    .distinct()
                                    .select("answers.*");
        return response.json(retrieveAnswers);
      }
      const retrieveImages = await knex("answers").select("*");
      return response.json(retrieveImages);
    } catch {
      return response.status(404).send();
    }
  }

  static async add({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    const { id } = request.params;
    const { post_id } = request.body;

    try{
      const res = await knex("answers_posts").insert({
        answer_id: id,
        post_id
      });
      return response.json(res);
    } catch {
      return response.status(401).send();
    }
  }
}