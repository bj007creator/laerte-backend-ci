import { Router } from "express";

import ImagesController from "../controllers/ImagesController";

import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get("", ImagesController.retrieve);

routes.post("", authMiddleware, ImagesController.store);

routes.put("/:id", authMiddleware, ImagesController.update);

routes.delete("/:id", authMiddleware, ImagesController.destroy);

routes.post("/:id", ImagesController.addAttribute);

export default routes;
