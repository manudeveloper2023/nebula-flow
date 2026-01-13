import type { User } from "../entities/user";

export interface UserRepository {
  findBySubject(subject: string): Promise<User | null>;
}
