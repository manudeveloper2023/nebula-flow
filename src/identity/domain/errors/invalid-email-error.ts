export class InvalidEmailError extends Error {
    constructor(value: string) {
        super(`Invalid email: ${value}`);
        this.name = "InvalidEmailError";
    }
}
