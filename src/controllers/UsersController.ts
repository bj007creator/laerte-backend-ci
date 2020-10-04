import { Request, Response } from "express";

import UsersServices from "../services/UsersServices";
import User from "../models/User";

const usersServices = new UsersServices();

class UsersController {
  index(request: Request, response: Response) {
    usersServices.index({ request, response });
  }
  show(request: Request, response: Response) {
    usersServices.show({ request, response });
  }
  store(request: Request, response: Response) {
    User.signUp({ request, response });
  }
  update(request: Request, response: Response) {
    User.changeData({ request, response });
  }
  destroy(request: Request, response: Response) {
    User.destroyData({ request, response });
  }
}

export default new UsersController();
