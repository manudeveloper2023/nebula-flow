export class Membership {
  constructor(
    private readonly userId: string,
    private readonly workspaceId: string,
    private readonly role: MembershipRole
  ) {}

  get UserId() {
    return this.userId;
  }

  get WorkspaceId() {
    return this.workspaceId;
  }

  get Role() {
    return this.role;
  }
}

export enum MembershipRole {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}
