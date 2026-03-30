import { NUMBER_OF_SALT_ROUNDS } from "../constants/auth";
import { Permission, UserLoginRequest, UserRegisterRequest, UserWithRolesAndPermission } from "../interfaces/user";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import SessionModel from "../models/SessionModel";
import mongoose from "mongoose";
import RoleModel from "../models/RoleModel";

export const register = async (data: UserRegisterRequest) => {
    const { name, email, password, roles } = data;

    const existingUser = await UserModel.findOne({ email });
    
    if (existingUser) {
        throw new Error("User already exists");
    }

    let roleIds: mongoose.Types.ObjectId [] = [];

    if (roles && roles.length > 0) {
        const fetchedRoles = await RoleModel.find({ name: { $in: roles } });
        roleIds = fetchedRoles.map(role => role._id);

        if (roleIds.length !== roles.length) {
            throw new Error("One or more roles do not exist");
        }
    }

    const hashedPassword = await bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS);

    return await UserModel.create({ name, email, password: hashedPassword, roles: roleIds });
}


export const login = async (data: UserLoginRequest) => {
    const { email, password } = data;

    const user = await UserModel.findOne({ email }).populate({
        path: "roles",
        populate: {
            path: "permissions"
        }
    }).select("+password") as UserWithRolesAndPermission;

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const roles = user?.roles?.map((role) => role.name) ?? [];
    const permissions = user?.roles?.flatMap((role) => role.permissions?.map((permission) => permission.name) ?? []) ?? [];

    const accessToken = await generateAccessToken(user, roles, permissions);
    const refreshToken = await generateRefreshToken(user);
        
    // Assignment: Use the expiry date from the refresh token
    await SessionModel.create({ userId: user.id, refreshToken, expiresAt:  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)})

    return { 
        accessToken, 
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            roles,
            permissions
        }
    };
}