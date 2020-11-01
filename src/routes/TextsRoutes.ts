import { Router } from "express";

import TextsController from "../controllers/TextsController";

import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get("", TextsController.retrieve);

routes.post("", authMiddleware, TextsController.store);

routes.put("/:id", authMiddleware, TextsController.update);

routes.delete("/:id", authMiddleware, TextsController.destroy);

routes.post("/:id", TextsController.addAttribute);

export default routes;
