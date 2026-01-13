import { injectable } from "tsyringe";
import type { WorkspaceRepository } from "../../domain/repositories/workspace-repository";
import type { Workspace } from "../../domain/entities/workspace";
import { WorkspaceMapper } from "../mappers/workspace-mapper";
import { prisma } from "../../../shared/databases/prisma";

@injectable()
export class WorkspaceRepositoryPrisma implements WorkspaceRepository {
  async save(workspace: Workspace): Promise<Workspace> {
    const data = WorkspaceMapper.toPersistence(workspace);

    if (!workspace.Id) {
      const createdWorkspace = await prisma.workspace.create({
        data,
        include: {
          users: true,
        },
      });

      return WorkspaceMapper.toDomain(createdWorkspace);
    }

    const updatedWorkspace = await prisma.workspace.update({
      where: { id: workspace.Id },
      data,
      include: {
        users: true,
      },
    });

    return WorkspaceMapper.toDomain(updatedWorkspace);
  }

  async findById(workspaceId: string): Promise<Workspace | null> {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        users: true,
      },
    });

    if (!workspace) {
      return null;
    }

    return WorkspaceMapper.toDomain(workspace);
  }
}
