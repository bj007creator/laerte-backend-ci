import { Router } from "express";

import ProfileController from "../controllers/ProfileController";

import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.get("", authMiddleware, ProfileController.recoverUserData);

export default routes;
