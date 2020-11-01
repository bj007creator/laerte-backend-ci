import { Request, Response } from "express";

import VideosServices from '../services/VideosServices';

export default class Videos {

  private inserted_date: string;
  private text_content: string;
  private size: string;
  private align: string;

  
  constructor(text_content: string, inserted_date: string, size: string, align: string) {
    this.align = align;
    this.size = size;
    this.inserted_date = inserted_date;
    this.text_content = text_content;
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

  static async storeText({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    VideosServices.store({ request, response });
  }

  static async deleteText({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    VideosServices.destroy({ request, response });
  }

  static async editText({
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