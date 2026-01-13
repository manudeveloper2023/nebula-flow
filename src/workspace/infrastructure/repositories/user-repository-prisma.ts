import { prisma } from "../../../shared/databases/prisma";
import type { User } from "../../domain/entities/user";
import type { UserRepository } from "../../domain/repositories/user-repository";
import { UserMapper } from "../mappers/user-mapper";

export class UserRepositoryPrisma implements UserRepository {
  async findBySubject(subject: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: subject },
      include: { roles: true },
    });

    if (!user) {
      return Promise.resolve(null);
    }

    return UserMapper.toDomain(user);
  }
}
