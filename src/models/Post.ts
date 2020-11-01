import { Request, Response } from "express";

import PostServices from '../services/PostServices';

export default class Post {
  
  private content: string;
  private image: string;
  private title: string;
  private likes: string;
  private deslikes: string;
  private inserted_date: string;

  
  constructor(image: string, content: string, likes: string, deslikes: string, title: string, inserted_date: string) {
    this.image = image;
    this.content = content;
    this.deslikes = deslikes;
    this.likes = likes;
    this.title = title;
    this.inserted_date = inserted_date;
  }

  static async recoverAll({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    
    PostServices.index({ request, response });
  }

  static async publishPost({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    PostServices.store({ request, response });
  }

  static async deletePost({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    PostServices.destroy({ request, response });
  }

  static async editPost({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    PostServices.update({ request, response });
  }
}