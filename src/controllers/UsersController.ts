import { Request, Response } from "express";

import UsersServices from "../services/UsersServices";
import Customer from "../models/Customer";

const usersServices = new UsersServices();

export default class UsersController {
  index(request: Request, response: Response) {
    usersServices.index({ request, response });
  }
  show(request: Request, response: Response) {
    usersServices.show({ request, response });
  }
  store(request: Request, response: Response) {
    Customer.signUp({ request, response });
  }
}
