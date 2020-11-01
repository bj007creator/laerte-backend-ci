import { Request, Response } from "express";

import knex from "../database/connection";

class VideosServices {
  static async store({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    const {
      video_url,
      height,
      width,
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
        const insertedId = await knex("videos").insert({
          inserted_date,
          video_url,
          height,
          width,
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
        const retrieveVideos = await knex("videos")
                                    .join("videos_posts", "videos.id", "=", "videos_posts.video_id")
                                    .where("videos_posts.post_id", post_id)
                                    .distinct()
                                    .select("videos.*");
        return response.json(retrieveVideos);
      }
      const retrieveVideos = await knex("videos").select("*");
      return response.json(retrieveVideos);
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
        await knex("videos").where("id", id).del();
        await knex("videos_posts").where("video_id", id).del();
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
      video_url,
      height,
      width,
      align
    } = request.body;
    try{
      const user = await knex("users").where("id", request.userId).first();
      if(user.isAdmin){
        await knex("videos").where("id", id).update({
          video_url,
          height,
          width,
          align
        });
        return response.json({ 
          video_url,
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
      const res = await knex("videos_posts").insert({
        video_id: id,
        post_id
      });
      return response.json(res);
    } catch {
      return response.status(401).send();
    }
  }
}

export default VideosServices;