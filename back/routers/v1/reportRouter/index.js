import { Router } from "express";
import {
  postReportController,
  getReportController,
  getCenterReportController,
  getCenterInComapnyReportController,
} from "../../../controllers/v1/reportController.js";

const reportRouter = Router();

reportRouter.post("/report", postReportController);
reportRouter.get("/report", getReportController);
reportRouter.get("/report/center", getCenterReportController);
reportRouter.get(
  "/report/center/:companyId",
  getCenterInComapnyReportController
);

export default reportRouter;
