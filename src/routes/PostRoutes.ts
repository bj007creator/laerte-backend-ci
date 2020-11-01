import { Router } from "express";

import PostController from "../controllers/PostController";

import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get("", PostController.retrieve);

routes.post("", authMiddleware, PostController.store);

routes.put("/:id", authMiddleware, PostController.update);

routes.delete("/:id", authMiddleware, PostController.destroy);

export default routes;
