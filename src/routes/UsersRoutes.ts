import { Router } from "express";

import UsersController from "../controllers/UsersController";

import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

const usersController = new UsersController();

routes.get("", authMiddleware, usersController.index);

routes.get("/:id", usersController.show);

routes.post("", usersController.store);

export default routes;
