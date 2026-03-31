import path from "node:path";
import UserModel from "../models/UserModel";

export const getAll = async () => {
    return await UserModel.find({}).populate({
        path: "roles",
        populate: {
            path: "permissions"
        }
    });
}

export const getById = async (userId: string) => {
    return await UserModel.findById(userId).populate({
        path: "roles",
        populate: {
            path: "permissions",
        }
    });
}