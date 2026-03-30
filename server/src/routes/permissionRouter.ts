import { Router } from "express";
import * as permissionController from "../controllers/permissionController";
import { validateRequestBody } from "../middlewares/validators";
import { createPermission } from "../schemas/permission";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post("/", authenticate, validateRequestBody(createPermission), permissionController.create);

export default router;