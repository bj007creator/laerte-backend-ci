import { Request, Response } from "express";

import User from "../models/User";

class ProfileController {
  recoverUserData(request: Request, response: Response) {
    User.recoverUserData({ request, response });
  }
}

export default new ProfileController();
