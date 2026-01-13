import { inject, injectable } from "tsyringe";
import type { WorkspaceCreateCommand } from "../commands/workspace-create-command";
import type { WorkspaceResponse } from "../../presentation/responses/workspace-response";
import { TOKENS } from "../../infrastructure/container/tokens";
import type { WorkspaceRepository } from "../../domain/repositories/workspace-repository";
import { Workspace } from "../../domain/entities/workspace";
import type { UserRepository } from "../../domain/repositories/user-repository";

@injectable()
export class SaveWorkspaceUseCase {
  constructor(
    @inject(TOKENS.WorkspaceRepository)
    private readonly workspaceRepository: WorkspaceRepository,
    @inject(TOKENS.UserRepository)
    private readonly userRepository: UserRepository
  ) {}
  async execute(
    workspaceCommand: WorkspaceCreateCommand
  ): Promise<WorkspaceResponse> {
    const { name, description, ownerSubject } = workspaceCommand;

    const owner = await this.userRepository.findBySubject(ownerSubject);

    if (!owner?.Id) {
      throw new Error("Owner not found");
    }

    const workspace = Workspace.save(name, description, owner.Id);

    const savedWorkspace = await this.workspaceRepository.save(workspace);

    return {
      id: savedWorkspace.Id!,
      name: savedWorkspace.Name,
      description: savedWorkspace.Description,
      deletedAt: savedWorkspace.DeletedAt,
    };
  }
}
