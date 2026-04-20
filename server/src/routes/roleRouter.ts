import { Router } from "express";
import * as roleController from "../controllers/roleController";
import { validateRequestBody } from "../middlewares/validators";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";
import * as roleSchema from "../schemas/role";

const router = Router();

router.post("/", authenticate, authorizeWithPermission({ permission: appPermissions.CREATE_ROLES.name }), validateRequestBody(roleSchema.createRole), roleController.create);

router.get("/", authenticate, authorizeWithPermission({ permission: appPermissions.VIEW_PERMISSIONS.name }), roleController.getAll);

router.put("/:id", authenticate, authorizeWithPermission({ permission: appPermissions.UPDATE_ROLES.name }), roleController.update);

router.delete("/:id", authenticate, authorizeWithPermission({ permission: appPermissions.DELETE_ROLES.name }), roleController.remove);

export default router;