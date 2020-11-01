import { Router } from "express";

import VideosController from "../controllers/VideosController";

import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get("", VideosController.retrieve);

routes.post("", authMiddleware, VideosController.store);

routes.put("/:id", authMiddleware, VideosController.update);

routes.delete("/:id", authMiddleware, VideosController.destroy);

routes.post("/:id", VideosController.addAttribute);

export default routes;
