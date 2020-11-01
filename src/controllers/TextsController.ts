import { Request, Response } from "express";

import Text from '../models/Text';

class TextController {
  store(request: Request, response: Response) {
    Text.storeText({ request, response });
  }
  retrieve(request: Request, response: Response) {
    Text.recoverAll({ request, response });
  }
  destroy(request: Request, response: Response) {
    Text.deleteText({ request, response });
  }
  update(request: Request, response: Response) {
    Text.editText({ request, response });
  }
  addAttribute(request: Request, response: Response) {
    Text.addAttribute({ request, response });
  }
}

export default new TextController();