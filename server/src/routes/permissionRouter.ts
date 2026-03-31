import { Router } from "express";
import * as permissionController from "../controllers/permissionController";
import { validateRequestBody } from "../middlewares/validators";
import { createPermission } from "../schemas/permission";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";

const router = Router();

router.post("/", authenticate, authorizeWithPermission({ permission: appPermissions.CREATE_PERMISSIONS.name }), validateRequestBody(createPermission), permissionController.create);

router.get("/", permissionController.getAll);

export default router;