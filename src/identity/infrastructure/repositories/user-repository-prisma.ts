import { inject, injectable } from "tsyringe";
import type { UserRepository } from "../../domain/repositories/user-repository";
import type { User } from "../../domain/entities/user";
import { UserMapper } from "../mappers/user-mapper";
import { prisma } from "../../../shared/infrastructure/prisma";

@injectable()
export class UserRepositoryPrisma implements UserRepository {
    async register(user: User): Promise<User> {
        const data = UserMapper.toPersistence(user);
        const createdUser = await prisma.user.create({ data });

        return UserMapper.toDomain(createdUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        const foundUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!foundUser) {
            return null;
        }

        return UserMapper.toDomain(foundUser);
    }
}
