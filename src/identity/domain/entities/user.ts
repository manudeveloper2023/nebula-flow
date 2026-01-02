import { Email } from "../value-objects/user-email";
import { Password } from "../value-objects/user-password";
import type { Role } from "./role";

export class User {
    private email: Email;
    private password: Password;
    constructor(
        private readonly id: string | null,
        private username: string,
        email: string,
        password: string,
        private roles: Role[] = []
    ) {
        this.email = new Email(email);
        this.password = new Password(password);
    }

    static register(
        username: string,
        email: string,
        password: string,
        roles: Role[] = []
    ) {
        return new User(null, username, email, password, roles);
    }

    get Id() {
        return this.id;
    }

    get Username() {
        return this.username;
    }

    get Email() {
        return this.email;
    }

    get Password() {
        return this.password;
    }

    get Roles() {
        return [...this.roles];
    }
}
