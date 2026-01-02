import type { PasswordHasher } from "../../domain/security/password-hasher";
import bcrypt from "bcrypt";

export class BcryptPasswordHasher implements PasswordHasher {
    constructor(private readonly saltRounds: number = 10) {}
    hash(plain: string): Promise<string> {
        const passwordHash = bcrypt.hash(plain, this.saltRounds);
        return passwordHash;
    }
    compare(plain: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plain, hash);
    }
}
