import axios from "axios";
import { config } from "../config";
import { getAccessToken } from "./token";
// import { buildUrl } from "./string";

const http = axios.create({
    baseURL: config.apiBaseURI,
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
    }
})

http.interceptors.request.use((config) => {
    if (config.headers) {
        // Get access token from the store (Hint: Do not use dispatch)
        config.headers.Authorization = `Bearer ${getAccessToken()}`
    }

    return config;
})

http.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    console.log(error);
})

// const REFRESH_TOKEN_URL = buildUrl(config.apiBaseURI, config.endpoints.authRefreshToken);


// let isRefreshingAccessToken = false;

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const unauthorizedResponseHandlerInterceptor = async (error: any) => {
//     const originalRequest = error.config;

//     if (!originalRequest) {
//         return Promise.reject(error);
//     }

//     const errorCode = error.status;
//     const originalRequestURL = originalRequest.url;

//     // If the error code is not unauthorized, reject the error
//     if (errorCode !== HttpStatusCode.Unauthorized) {
//         return Promise.reject(error);
//     }

//     // If the original called URL endpoint is to fetch refresh token, and there is an error, we need to reject error
//     if (originalRequestURL === REFRESH_TOKEN_URL) {
//         // Add code to logout user, clear tokens, reject error

//         return Promise.reject(error);
//     }

//     try {
//         const refreshToken = getRefreshToken();

//         if (!refreshToken) {
//             // Add code to logout user
//         }

//         // Code to fetch access token based on refresh token
//         if (!isRefreshingAccessToken) {
//             isRefreshingAccessToken = true;

//             const {} = await refreshAccessToken(refreshToken);
//         }
//     }
// }

export default http;