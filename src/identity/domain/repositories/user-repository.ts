import type { User } from "../entities/user";

export interface UserRepository {
    register(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
