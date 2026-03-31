import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticate, AuthRequest } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";

const router = Router();

router.get("/me", authenticate, userController.getMe);

router.get("/", authenticate, authorizeWithPermission({ permission: appPermissions.VIEW_USERS.name }), userController.getAll);

// Example of a protected route that requires "MANAGE_USERS" permission to update user roles
router.patch("/:userId/roles", authenticate, authorizeWithPermission({ permission: appPermissions.MANAGE_USERS.name }), () => {});

export default router;