import { Request, Response, NextFunction } from "express";
import * as userServices from "../services/userServices";
import { successResponse } from "../utils/responseHelper";
import { AuthRequest } from "../middlewares/authenticate";

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await userServices.getAll();

        return successResponse(res, { data: response })

    } catch (error) {
        next(error);
    }
}

export const getMe = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const response = await userServices.getById(userId);

        return successResponse(res, { data: response })

    } catch (error) {
        next(error);
    }
}