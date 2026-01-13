import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../infrastructure/container/tokens";
import type { UserRepository } from "../../domain/repositories/user-repository";
import type { PasswordHasher } from "../../domain/security/password-hasher";
import type { LoginUserCommand } from "../commands/login-user-command";
import type { LoginUserResponse } from "../../presentation/responses/login-user-response";
import { UserNotFoundError } from "../../domain/errors/user-not-found";
import type { JwtServiceInterface } from "../../domain/security/jwt-service-interface";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject(TOKENS.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(TOKENS.PasswordHasher)
    private readonly passwordHasher: PasswordHasher,
    @inject(TOKENS.JwtService)
    private readonly jwtService: JwtServiceInterface
  ) {}

  async execute(
    loginUserCommand: LoginUserCommand
  ): Promise<LoginUserResponse> {
    const { email, password } = loginUserCommand;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError(
        "User with the provided email does not exist"
      );
    }

    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.Password.value
    );

    if (!isPasswordValid) {
      throw new UserNotFoundError("Invalid credentials");
    }

    const token = await this.jwtService.sign(user);
    return {
      token,
      user: {
        id: user.Id!,
        username: user.Username,
        email: user.Email.value,
      },
    };
  }
}
