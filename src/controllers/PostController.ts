import { Request, Response } from "express";

import Post from '../models/Post';

class PostController {
  store(request: Request, response: Response) {
    Post.publishPost({ request, response });
  }
  retrieve(request: Request, response: Response) {
    Post.recoverAll({ request, response });
  }
  destroy(request: Request, response: Response) {
    Post.deletePost({ request, response });
  }
  update(request: Request, response: Response) {
    Post.editPost({ request, response });
  }
}

export default new PostController();