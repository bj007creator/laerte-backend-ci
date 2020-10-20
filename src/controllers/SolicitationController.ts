import { Request, Response } from "express";

import Solicitation from '../models/Solicitation';

class SolicitationController {
  store(request: Request, response: Response) {
    Solicitation.registerRequest({ request, response });
  }
  retrieve(request: Request, response: Response) {
    Solicitation.recoverAll({ request, response });
  }
  update(request: Request, response: Response) {
    Solicitation.changeRequestState({ request, response });
  }
}

export default new SolicitationController();