import mongoose from "mongoose";

export interface UserRegisterRequest  {
    name: string;
    email: string;
    password: string;
    roles?: string[]; // Optional roles field for roles & permissions
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface AuthenticatedUser {
    _id: string;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export interface Permission {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
}

export interface Role {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    permissions: Permission[];
}

export interface UserWithRolesAndPermission {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    roles: Role[];
}