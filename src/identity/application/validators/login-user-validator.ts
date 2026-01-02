import { z } from "zod";

export const LoginUserSchema = z.object({
    email: z
        .string("Invalid email format")
        .regex(
            /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i
        ),
    password: z
        .string("Password must be between 6 and 100 characters long")
        .min(6)
        .max(100),
});
