import { Request, Response } from "express";

import Video from '../models/Video';

class VideoController {
  store(request: Request, response: Response) {
    Video.storeVideo({ request, response });
  }
  retrieve(request: Request, response: Response) {
    Video.recoverAll({ request, response });
  }
  destroy(request: Request, response: Response) {
    Video.deleteVideo({ request, response });
  }
  update(request: Request, response: Response) {
    Video.editVideo({ request, response });
  }
  addAttribute(request: Request, response: Response) {
    Video.addAttribute({ request, response });
  }
}

export default new VideoController();