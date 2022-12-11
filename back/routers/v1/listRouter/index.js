import { Router } from "express";
import { getCompanyListController } from "../../../controllers/v1/listController.js";

const listRouter = Router();

listRouter.get("/list/company", getCompanyListController);

export default listRouter;
