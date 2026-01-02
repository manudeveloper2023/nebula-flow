import { injectable } from "tsyringe";
import { RegisterUserUseCase } from "../../application/use-cases/register-user.ts";
import type { Request, Response } from "express";
import { registerUserSchema } from "../../application/validators/register-user-validator.ts";
import { LoginUserUseCase } from "../../application/use-cases/login-user.ts";
import { LoginUserSchema } from "../../application/validators/login-user-validator.ts";

@injectable()
export class AuthController {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase
    ) {}

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

    login = async (req: Request, res: Response) => {
        const parseResult = LoginUserSchema.safeParse(req.body);

        if (!parseResult.success) {
            return res.status(400).json({
                message: "Invalid request data",
                errors: parseResult.error.issues,
            });
        }

        const { email, password } = parseResult.data;

        const loginResponse = await this.loginUserUseCase.execute({
            email,
            password,
        });

        res.status(200).json({
            message: "User logged in successfully",
            ...loginResponse,
        });
    };
}
