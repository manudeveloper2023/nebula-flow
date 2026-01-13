import type { WorkspaceGetPayload } from "../../../../../generated/prisma/models";

export type WorkspaceWithMembers = WorkspaceGetPayload<{
  include: {
    users: true;
  };
}>;
