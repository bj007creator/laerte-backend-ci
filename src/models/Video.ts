import { Request, Response } from "express";

import VideosServices from '../services/VideosServices';

export default class Videos {

  private inserted_date: string;
  private video_url: string;
  private height: string;
  private width: string;
  private align: string;

  
  constructor(video_url: string, inserted_date: string, height: string, width: string, align: string) {
    this.align = align;
    this.width = width;
    this.inserted_date = inserted_date;
    this.video_url = video_url;
    this.height = height;
  }

  static async recoverAll({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    
    VideosServices.index({ request, response });
  }

  static async storeVideo({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    VideosServices.store({ request, response });
  }

  static async deleteVideo({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    VideosServices.destroy({ request, response });
  }

  static async editVideo({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    VideosServices.update({ request, response });
  }

  static async addAttribute({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    VideosServices.addAttribute({ request, response });
  }
}