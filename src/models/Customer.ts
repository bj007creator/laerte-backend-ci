import { Request, Response } from "express";

import UserServices from "../services/UsersServices";
import User from "./User";

export default class Customer extends User {
  static async signUp({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    UserServices.store({ request, response });
  }
}
