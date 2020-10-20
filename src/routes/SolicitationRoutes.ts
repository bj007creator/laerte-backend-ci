import { Router } from "express";

import SolicitationController from "../controllers/SolicitationController";

import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get("", authMiddleware, SolicitationController.retrieve);

routes.post("", authMiddleware, SolicitationController.store);

routes.put("/:id", authMiddleware, SolicitationController.update);

export default routes;
