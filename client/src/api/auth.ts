import type { AuthenticatedUser } from "../interfaces/user";
import type { LoginFormData } from "../pages/Login";
import http from "../utils/http";



interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: AuthenticatedUser
}

export const login = async (body: LoginFormData): Promise<LoginResponse> => {
    return http.post("/auth/login", body);
}

