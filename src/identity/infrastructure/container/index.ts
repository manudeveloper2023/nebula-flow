import { container } from "tsyringe";
import { UserRepositoryPrisma } from "../repositories/user-repository-prisma";
import { BcryptPasswordHasher } from "../security/bcrypt-password-hasher";
import { TOKENS } from "./tokens";

container.register(TOKENS.UserRepository, {
    useClass: UserRepositoryPrisma,
});

container.register(TOKENS.PasswordHasher, {
    useClass: BcryptPasswordHasher,
});
