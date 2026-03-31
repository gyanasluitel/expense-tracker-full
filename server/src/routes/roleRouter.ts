import { Router } from "express";
import * as roleController from "../controllers/roleController";
import { validateRequestBody } from "../middlewares/validators";
import { createRole } from "../schemas/role";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";

const router = Router();

router.post("/", authenticate, authorizeWithPermission({ permission: appPermissions.CREATE_ROLES.name }), validateRequestBody(createRole), roleController.create);

router.get("/", roleController.getAll);

export default router;