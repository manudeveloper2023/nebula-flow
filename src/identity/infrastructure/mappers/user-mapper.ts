import type {
  UserCreateInput,
  UserModel,
} from "../../../../generated/prisma/models";
import { Role, RoleName } from "../../domain/entities/role";
import { User } from "../../domain/entities/user";
import type { UserWithRoles } from "../databases/types/user.types";

export class UserMapper {
  static toPersistence(user: User): UserCreateInput {
    const data: UserCreateInput = {
      username: user.Username,
      email: user.Email.value,
      password: user.Password.value,
    };

    if (user.Roles.length > 0) {
      data.roles = {
        connect: user.Roles.map((role) => ({ name: role.Name })),
      };
    }

    return data;
  }

  static toDomain(user: UserWithRoles): User {
    const roles = user.roles.map((role) => new Role(role.name as RoleName));
    return new User(user.id, user.username, user.email, user.password, roles);
  }
}
