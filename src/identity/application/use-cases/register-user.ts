import { inject, injectable } from "tsyringe";
import type { UserRepository } from "../../domain/repositories/user-repository";
import type { PasswordHasher } from "../../domain/security/password-hasher";
import type { RegisterUserCommand } from "../commands/register-user-command";
import { User } from "../../domain/entities/user";
import type { RegisterUserResponse } from "../../presentation/responses/register-user-response";
import { EmailAlreadyInUseError } from "../../domain/errors/email-already-in-use";
import { TOKENS } from "../../infrastructure/container/tokens";

@injectable()
export class RegisterUserUseCase {
    constructor(
        @inject(TOKENS.UserRepository)
        private readonly userRepository: UserRepository,
        @inject(TOKENS.PasswordHasher)
        private readonly passwordHasher: PasswordHasher
    ) {}

    async execute(
        RegisterUserCommand: RegisterUserCommand
    ): Promise<RegisterUserResponse> {
        if (await this.userRepository.findByEmail(RegisterUserCommand.email)) {
            throw new EmailAlreadyInUseError(RegisterUserCommand.email);
        }
        const { username, email, password } = RegisterUserCommand;

        const hashedPassword = await this.passwordHasher.hash(password);

        const user = User.register(username, email, hashedPassword);

        const registerUser = await this.userRepository.register(user);

        return {
            id: registerUser.Id!,
            username: registerUser.Username,
            email: registerUser.Email.value,
        };
    }
}
