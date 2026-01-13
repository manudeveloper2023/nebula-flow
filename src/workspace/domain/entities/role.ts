export class Role {
  constructor(private readonly name: RoleName) {}

  is(role: RoleName) {
    return this.name === role;
  }

  get Name() {
    return this.name;
  }
}

export enum RoleName {
  ADMIN = "ADMIN",
  USER = "USER",
}
