import { z } from "zod";

export const registerUserSchema = z.object({
    username: z
        .string("Username must be between 3 and 30 characters long")
        .min(3)
        .max(30),
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

export type RegisterUserDTO = z.infer<typeof registerUserSchema>;
