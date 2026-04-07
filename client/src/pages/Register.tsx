import { z } from "zod";
import type { registerSchema } from "../schemas/auth";

export type RegisterFormData = z.infer<typeof registerSchema>