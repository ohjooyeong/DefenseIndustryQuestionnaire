import { Router } from "express";
import {
  getReportController,
  getResultController,
  postReportController,
  postResultController,
} from "../../../controllers/v1/questionController.js";

const questionRouter = Router();

questionRouter.post("/question/result", postResultController);
questionRouter.get("/question/result", getResultController);

questionRouter.post("/question/report", postReportController);
questionRouter.get("/question/report", getReportController);

export default questionRouter;
