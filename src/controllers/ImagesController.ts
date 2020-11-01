import { Request, Response } from "express";

import Image from '../models/Image';

class ImageController {
  store(request: Request, response: Response) {
    Image.storeImage({ request, response });
  }
  retrieve(request: Request, response: Response) {
    Image.recoverAll({ request, response });
  }
  destroy(request: Request, response: Response) {
    Image.deleteImage({ request, response });
  }
  update(request: Request, response: Response) {
    Image.editImage({ request, response });
  }
  addAttribute(request: Request, response: Response) {
    Image.addAttribute({ request, response });
  }
}

export default new ImageController();