import { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/responseHelper";
import * as permissionServices from "../services/permissionServices";

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await permissionServices.create(req.body);

        return successResponse(res, { data: response })

    } catch (error) {
        next(error);
    }
}

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await permissionServices.getAll();

        return successResponse(res, { data: response })
    }
    catch (error) {
        next(error);
    }
}