import { Request, Response } from "express";

import knex from "../database/connection";

class ImagesServices {
  static async store({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    const {
      image_url,
      height,
      width,
      align
    } = request.body;

    try{
      const date = new Date();
      const inserted_date = JSON.stringify({
        year: date.getUTCFullYear(),
        month: date.getUTCMonth(),
        day: date.getUTCDate(),
        hours: date.getHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
        milliseconds: date.getUTCMilliseconds(),
      });
      
      const user = await knex("users").where("id", request.userId).first();
      if(user.isAdmin){
        const insertedId = await knex("images")
        .returning('id')
        .insert({
          inserted_date,
          image_url,
          height,
          width,
          align
        });
        return response.json({insertedId});
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
        const retrieveImages = await knex("images")
                                    .join("images_posts", "images.id", "=", "images_posts.image_id")
                                    .where("images_posts.post_id", String(post_id))
                                    .distinct()
                                    .select("images.*");
        return response.json(retrieveImages);
      }
      const retrieveImages = await knex("images").select("*");
      return response.json(retrieveImages);
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
        await knex("images").where("id", id).del();
        await knex("images_posts").where("image_id", id).del();
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
      image_url,
      height,
      width,
      align
    } = request.body;
    try{
      const user = await knex("users").where("id", request.userId).first();
      if(user.isAdmin){
        await knex("images").where("id", id).update({
          image_url,
          height,
          width,
          align
        });
        return response.json({ 
          image_url,
          height,
          width,
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
      const res = await knex("images_posts").insert({
        image_id: id,
        post_id
      });
      return response.json(res);
    } catch {
      return response.status(401).send();
    }
  }
}

export default ImagesServices;