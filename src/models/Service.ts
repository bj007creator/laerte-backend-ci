import { Request, Response } from "express";

import OfferServices from '../services/OfferServices';

export default class User {
  private name: string;
  
  constructor(name: string) {
    this.name = name;
  }

  static async recoverAll({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    OfferServices.retrieve({ request, response });
  }

  static async registerService({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    OfferServices.store({ request, response });
  }

  static async deleteService({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    OfferServices.destroy({ request, response });
  }

  static async changeService({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    OfferServices.update({ request, response });
  }

  static async requestService({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    
  }

  getName() {
    return this.name;
  }
}