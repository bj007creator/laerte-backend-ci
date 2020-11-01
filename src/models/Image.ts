import { Request, Response } from "express";

import ImagesServices from '../services/ImagesServices';

export default class Images {

  private inserted_date: string;
  private image_url: string;
  private height: string;
  private width: string;
  private align: string;

  
  constructor(image_url: string, inserted_date: string, height: string, width: string, align: string) {
    this.align = align;
    this.width = width;
    this.inserted_date = inserted_date;
    this.image_url = image_url;
    this.height = height;
  }

  static async recoverAll({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    
    ImagesServices.index({ request, response });
  }

  static async storeImage({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    ImagesServices.store({ request, response });
  }

  static async deleteImage({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    ImagesServices.destroy({ request, response });
  }

  static async editImage({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    ImagesServices.update({ request, response });
  }

  static async addAttribute({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    ImagesServices.addAttribute({ request, response });
  }
}