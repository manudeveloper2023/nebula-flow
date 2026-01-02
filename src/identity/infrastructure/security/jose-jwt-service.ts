import type { User } from "../../domain/entities/user";
import type { JwtServiceInterface } from "../../domain/security/jwt-service-interface";
import { jwtVerify, SignJWT } from "jose";
export class JoseJWTService implements JwtServiceInterface {
    private readonly secret: Uint8Array;
    constructor(secretKey: string) {
        this.secret = new TextEncoder().encode(secretKey);
    }

    async sign(user: User): Promise<string> {
        const alg = "HS256";

        const jwt = await new SignJWT({})
            .setProtectedHeader({ alg })
            .setSubject(user.Email.value)
            .setExpirationTime("2h")
            .setNotBefore("0s")
            .sign(this.secret);

        return jwt;
    }

    async verify(token: string, user: User): Promise<boolean> {
        const verify = await jwtVerify(token, this.secret);
        const { payload } = verify;
        return payload.sub === user.Email.value;
    }
}
