import { Router } from "express";
import { postResultController } from "../../../controllers/v1/questionController.js";

const questionRouter = Router();

questionRouter.post("/question/result", postResultController);

export default questionRouter;
