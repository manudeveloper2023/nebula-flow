import type { User } from "../entities/user";

export interface JwtServiceInterface {
    sign(user: User): Promise<string>;
    verify(token: string, user: User): Promise<boolean>;
}
