import type { Workspace } from "../entities/workspace";

export interface WorkspaceRepository {
  save(workspace: Workspace): Promise<Workspace>;
  findById(workspaceId: string): Promise<Workspace | null>;
}
