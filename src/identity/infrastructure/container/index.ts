import { container } from "tsyringe";
import { UserRepositoryPrisma } from "../repositories/user-repository-prisma";
import { BcryptPasswordHasher } from "../security/bcrypt-password-hasher";
import { TOKENS } from "./tokens";
import { JoseJWTService } from "../security/jose-jwt-service";

container.register(TOKENS.UserRepository, {
    useClass: UserRepositoryPrisma,
});

container.register(TOKENS.PasswordHasher, {
    useClass: BcryptPasswordHasher,
});

container.register(TOKENS.JwtService, {
    useValue: new JoseJWTService(process.env.SECRET_KEY!),
});
