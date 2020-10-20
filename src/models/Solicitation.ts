import { Request, Response } from "express";

import SolicitationServices from '../services/SolicitationServices';

export enum STATE {
  PENDING = 0,
  CANCELED = 1,
  DONE = 2,
}

export default class Solicitation {
  private id: number;
  private message: string;
  private state: STATE;
  private service_id: number;
  private client_name: string;

  constructor(message: string, state: STATE, service_id: number, id: number, client_name: string) {
    this.id = id;
    this.message = message;
    this.state = state;
    this.service_id = service_id;
    this.client_name = client_name;
  }

  static async registerRequest({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    return SolicitationServices.store({ request, response });
  }

  static async recoverAll({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    return SolicitationServices.index({ request, response });
  }

  static async changeRequestState({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    return SolicitationServices.update({ request, response });
  }

}
