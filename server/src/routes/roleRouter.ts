import { Router } from "express";
import * as roleController from "../controllers/roleController";
import { validateRequestBody } from "../middlewares/validators";
import { createRole } from "../schemas/role";

const router = Router();

router.post("/", validateRequestBody(createRole), roleController.create);

router.get("/", roleController.getAll);

export default router;