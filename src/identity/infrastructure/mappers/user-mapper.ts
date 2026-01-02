import type {
    UserCreateInput,
    UserModel,
} from "../../../../generated/prisma/models";
import { User } from "../../domain/entities/user";

export class UserMapper {
    static toPersistence(user: User): UserCreateInput {
        return {
            username: user.Username,
            email: user.Email.value,
            password: user.Password.value,
        };
    }

    static toDomain(raw: any): User {
        return new User(
            raw.id,
            raw.username,
            raw.email,
            raw.password,
            raw.roles
        );
    }
}
