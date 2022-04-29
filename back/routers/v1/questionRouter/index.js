import { Router } from "express";
import {
  getResultController,
  postResultController,
} from "../../../controllers/v1/questionController.js";

const questionRouter = Router();

questionRouter.post("/question/result", postResultController);
questionRouter.get("/question/result", getResultController);

export default questionRouter;
