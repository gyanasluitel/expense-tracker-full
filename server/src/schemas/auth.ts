import { z } from "zod";

export const createUser = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(10),
    roles: z.array(z.string()).optional(),
})

export const login = z.object({
    email: z.email(),
    password: z.string(),
})