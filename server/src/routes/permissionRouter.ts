import { Router } from "express";
import * as permissionController from "../controllers/permissionController";
import { validateRequestBody } from "../middlewares/validators";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";
import * as permissionSchema from "../schemas/permission";

const router = Router();

router.post("/", authenticate, authorizeWithPermission({ permission: appPermissions.CREATE_PERMISSIONS.name }), validateRequestBody(permissionSchema.createPermission), permissionController.create);

router.get("/", authenticate, authorizeWithPermission({ permission: appPermissions.VIEW_PERMISSIONS.name }), permissionController.getAll);

export default router;