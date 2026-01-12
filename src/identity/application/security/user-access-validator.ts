import { inject, injectable } from "tsyringe";
import type { UserRepository } from "../../domain/repositories/user-repository";
import { TOKENS } from "../../infrastructure/container/tokens";
import type { AccessValidator } from "../../../shared/auth/access-validator";

@injectable()
export class UserAccessValidator {
  constructor(
    @inject(TOKENS.UserRepository)
    private readonly users: UserRepository
  ) {}

  validate: AccessValidator = async (email, roles) => {
    const user = await this.users.findByEmail(email);
    return !!user && user.canAccess(roles);
  };
}
