import { Membership, type MembershipRole } from "./membership";

export class Workspace {
  constructor(
    private readonly id: string | null,
    private name: string,
    private description: string | null,
    private ownerId: string,
    private members: Membership[] = [],
    private deletedAt: Date | null = null
  ) {}

  static save(name: string, description: string | null, ownerId: string) {
    return new Workspace(null, name, description, ownerId);
  }

  destroy() {
    this.deletedAt = new Date();
  }

  canBeDeletedByOwner(userId: string) {
    return this.ownerId === userId;
  }

  hasMember(userId: string) {
    return this.members.some((m) => m.UserId === userId);
  }

  addMember(userId: string, role: MembershipRole) {
    if (this.hasMember(userId)) {
      throw new Error("User is already a member of the workspace");
    }

    if (this.ownerId === userId) {
      throw new Error("Owner is already a member of the workspace");
    }

    if (this.id === null) {
      throw new Error("Workspace must be saved before adding members");
    }

    const membership = new Membership(userId, this.id, role);

    this.members.push(membership);
  }

  removeMember(userId: string) {
    if (this.ownerId === userId) {
      throw new Error("Owner cannot be removed from the workspace");
    }

    this.members = this.members.filter((m) => m.UserId !== userId);
  }

  get Id() {
    return this.id;
  }

  get Name() {
    return this.name;
  }
  get Description() {
    return this.description;
  }

  get OwnerId() {
    return this.ownerId;
  }
  get Members() {
    return [...this.members];
  }

  get DeletedAt() {
    return this.deletedAt;
  }
}
