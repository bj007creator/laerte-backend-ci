import { Request, Response } from "express";

import AuthServices from "../services/AuthServices";

export default class User {
  private name: string;
  private password: string;
  private id: number;
  private email: string;

  constructor(name: string, password: string, id: number, email: string) {
    this.name = name;
    this.password = password;
    this.id = id;
    this.email = email;
  }

  static async signIn({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    AuthServices.authenticate({ request, response });
  }

  static async signInSocial({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    AuthServices.socialAuthenticate({ request, response });
  }

  static async recoverUserData({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {}

  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getId() {
    return this.id;
  }
  getPassword() {
    return this.password;
  }
}
