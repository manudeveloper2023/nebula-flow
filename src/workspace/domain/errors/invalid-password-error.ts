export class InvalidPasswordError extends Error {
    constructor(value: string) {
        super(`Invalid password: ${value}`);
        this.name = "InvalidPasswordError";
    }
}
