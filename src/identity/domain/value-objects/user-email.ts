import { InvalidEmailError } from "../errors/invalid-email-error";

export class Email {
    
    constructor(readonly value: string) {
        if (!this.validateEmail(value)) {
            throw new InvalidEmailError(value);
        }
    }

    private validateEmail(email: string): boolean {
        return email.includes("@");
    }
}
