import { Request, Response } from "express";

import TextsServices from '../services/TextsServices';

export default class Texts {

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
    
    TextsServices.index({ request, response });
  }

  static async storeText({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    TextsServices.store({ request, response });
  }

  static async deleteText({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    TextsServices.destroy({ request, response });
  }

  static async editText({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    TextsServices.update({ request, response });
  }

  static async addAttribute({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    TextsServices.addAttribute({ request, response });
  }
}