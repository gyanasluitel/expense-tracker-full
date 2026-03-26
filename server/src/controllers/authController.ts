import { Request, Response, NextFunction } from "express";
import * as authServices from "../services/authServices";
import httpCodes from "../constants/httpCodes";
import { successResponse } from "../utils/responseHelper";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await authServices.register(req.body);

        return successResponse(res, { status: httpCodes.RESOURCE_CREATED.statusCode })

        res.status(httpCodes.RESOURCE_CREATED.statusCode).send({});
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await authServices.login(req.body);

        return successResponse(res, { data: response })
    }
    catch (error) {
        next(error);
    }
}

// logout, generateAccessTokenBasedOnRefreshToken