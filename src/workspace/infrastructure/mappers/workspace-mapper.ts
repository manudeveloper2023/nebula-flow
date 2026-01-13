import type {
  WorkspaceCreateInput,
  WorkspaceModel,
} from "../../../../generated/prisma/models";
import { Membership, MembershipRole } from "../../domain/entities/membership";
import { Workspace } from "../../domain/entities/workspace";
import type { WorkspaceWithMembers } from "../databases/types/workspace.type";

export class WorkspaceMapper {
  static toDomain(workspace: WorkspaceWithMembers): Workspace {
    const members = workspace.users.map(
      (user) =>
        new Membership(user.id, user.workspaceId, user.role as MembershipRole)
    );

    return new Workspace(
      workspace.id,
      workspace.name,
      workspace.description,
      workspace.ownerId,
      members
    );
  }

  static toPersistence(workspace: Workspace): WorkspaceCreateInput {
    return {
      id: workspace.Id ?? undefined,
      name: workspace.Name,
      description: workspace.Description,
      users: {
        create: workspace.Members.map((member) => ({
          userId: member.UserId,
          role: member.Role as MembershipRole,
        })),
      },
      owner: {
        connect: { id: workspace.OwnerId },
      },
    };
  }
}
