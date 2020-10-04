import { Router } from "express";

import ServicesController from "../controllers/ServicesController";

import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get("", ServicesController.retrieve);

routes.post("", authMiddleware, ServicesController.store);

routes.put("/:id", authMiddleware, ServicesController.update);

routes.delete("/:id", authMiddleware, ServicesController.destroy);

export default routes;
