import { inject, injectable } from "tsyringe";
import type { UserRepository } from "../../domain/repositories/user-repository";
import type { PasswordHasher } from "../../domain/security/password-hasher";
import type { RegisterUserCommand } from "../commands/register-user-command";
import { User } from "../../domain/entities/user";

@injectable()
export class RegisterUserUseCase {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: UserRepository,
        @inject("PasswordHasher")
        private readonly passwordHasher: PasswordHasher
    ) {}

    async execute(RegisterUserCommand: RegisterUserCommand) {
        const { username, email, password } = RegisterUserCommand;
        const hashedPassword = await this.passwordHasher.hash(password);

        const user = User.register(username, email, hashedPassword);
        const registerUser = await this.userRepository.register(user);
        return registerUser;
    }
}
