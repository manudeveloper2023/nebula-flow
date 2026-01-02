import { injectable } from "tsyringe";
import { RegisterUserUseCase } from "../../application/use-cases/register-user.ts";
import type { Request, Response } from "express";
import { registerUserSchema } from "../../application/validators/register-user-validator.ts";

@injectable()
export class AuthController {
    constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

    register = async (req: Request, res: Response) => {
        const parseResult = registerUserSchema.safeParse(req.body);

        if (!parseResult.success) {
            return res.status(400).json({
                message: "Invalid request data",
                errors: parseResult.error.issues,
            });
        }

        const { username, email, password } = parseResult.data;

        const registeredUser = await this.registerUserUseCase.execute({
            username,
            email,
            password,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: registeredUser,
        });
    };
}
