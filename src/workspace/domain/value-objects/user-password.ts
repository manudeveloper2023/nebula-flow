import { InvalidPasswordError } from "../errors/invalid-password-error";

export class Password {
    constructor(readonly value: string) {
        if (value.length < 8) {
            throw new InvalidPasswordError(value);
        }
    }
}
