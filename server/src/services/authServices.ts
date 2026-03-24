import { UserAuthRequest } from "../interfaces/user";
import UserModel from "../models/UserModel";

export const register = async (data: UserAuthRequest) => {
    // Implementation goes here
    const { name, email, password } = data;

    const existingUser = await UserModel.findOne({ email });
    
    if (existingUser) {
        throw new Error("User already exists");
    }

    return await UserModel.create({ name, email, password });
}