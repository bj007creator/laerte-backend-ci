import { Request, Response } from "express";

import Service from '../models/Service';

class ServicesController {
  store(request: Request, response: Response) {
    Service.registerService({ request, response });
  }
  retrieve(request: Request, response: Response) {
    Service.recoverAll({ request, response });
  }
  destroy(request: Request, response: Response) {
    Service.deleteService({ request, response });
  }
  update(request: Request, response: Response) {
    Service.changeService({ request, response });
  }
}

export default new ServicesController();