import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticate, AuthRequest } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";

const router = Router();

router.get("/me", authenticate, (req: AuthRequest, res) => {
    console.log("Authenticated user");


    res.send({});
});

router.get("/", authenticate, authorizeWithPermission({ permission: "VIEW_USERS" }), userController.getAll);

export default router;