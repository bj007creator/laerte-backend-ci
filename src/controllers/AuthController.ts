import { Request, Response } from "express";

import User from "../models/User";

export default class AuthController {
  authenticate(request: Request, response: Response) {
    User.signIn({ request, response });
  }
  socialAuthenticate(request: Request, response: Response) {
    User.signInSocial({ request, response });
  }
}
