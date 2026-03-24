import { Request, Response, NextFunction } from "express";
import * as authServices from "../services/authServices";
import httpCodes from "../constants/httpCodes";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await authServices.register(req.body);

        res.status(httpCodes.RESOURCE_CREATED.statusCode).send({});
    } catch (error) {
        next(error);
    }
}

// login, logout, generateAccessTokenBasedOnRefreshToken