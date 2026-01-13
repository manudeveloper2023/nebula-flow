import { id } from "zod/locales";
import type {
  UserCreateInput,
  UserModel,
} from "../../../../generated/prisma/models";
import { User } from "../../domain/entities/user";
import { Email } from "../../domain/value-objects/user-email";
import { Password } from "../../domain/value-objects/user-password";

export class UserMapper {
  static toDomain(user: UserModel): User {
    return new User(
      user.id,
      user.username,
      new Email(user.email),
      new Password(user.password),
      null,
      []
    );
  }

  static toPersistence(user: User): UserCreateInput {
    return {
      username: user.Username,
      email: user.Email.value,
      password: user.Password.value,
    };
  }
}
