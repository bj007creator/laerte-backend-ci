import { Router } from "express";

import UsersController from "../controllers/UsersController";

import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get("", UsersController.index);

routes.get("/:id", UsersController.show);

routes.post("", UsersController.store);

routes.put("/:id", authMiddleware, UsersController.update);

routes.delete("/:id", authMiddleware, UsersController.destroy);

export default routes;
