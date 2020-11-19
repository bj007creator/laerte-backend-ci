import { Router } from "express";

import AnswerServices from "../services/AnswerServices";

import authMiddleware from '../middlewares/authMiddleware';

const routes = Router();

routes.get("", AnswerServices.retrieve);

routes.post("", authMiddleware, AnswerServices.store);

routes.post("/:id", AnswerServices.add);

export default routes;
