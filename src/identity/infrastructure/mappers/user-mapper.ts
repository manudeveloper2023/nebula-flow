import type {
  UserCreateInput,
  UserModel,
} from "../../../../generated/prisma/models";
import { Role, RoleName } from "../../domain/entities/role";
import { User } from "../../domain/entities/user";
import type { UserWithRoles } from "../databases/types/user.types";

export class UserMapper {
  static toPersistence(user: User): UserCreateInput {
    return {
      username: user.Username,
      email: user.Email.value,
      password: user.Password.value,
    };
  }

  static toDomain(user: UserWithRoles): User {
    const roles = user.roles.map((role) => new Role(role.name as RoleName));
    return new User(user.id, user.username, user.email, user.password, roles);
  }
}
