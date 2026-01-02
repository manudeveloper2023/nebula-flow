export class Role {
    constructor(private readonly name: RoleName) {}

    is(role: RoleName) {
        return this.name === role;
    }
}

export enum RoleName {
    ADMIN = "ADMIN",
    USER = "USER",
}
