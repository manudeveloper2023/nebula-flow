import { Email } from "../value-objects/user-email";
import { Password } from "../value-objects/user-password";
import type { Role, RoleName } from "./role";

export class User {
  constructor(
    private readonly id: string | null,
    private username: string,
    private email: Email,
    private password: Password,
    private deletedAt: Date | null = null,
    private roles: Role[] = []
  ) {}

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

  get DeletedAt() {
    return this.deletedAt;
  }

  get Roles() {
    return [...this.roles];
  }

  hasAnyRole(...roles: RoleName[]): boolean {
    return this.roles.some((r) => roles.includes(r.Name));
  }

  isActive() {
    return this.deletedAt === null;
  }
}
