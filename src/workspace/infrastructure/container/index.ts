import { container } from "tsyringe";
import { TOKENS } from "./tokens";
import { WorkspaceRepositoryPrisma } from "../repositories/workspace-repository-prisma";
import { UserRepositoryPrisma } from "../repositories/user-repository-prisma";

container.register(TOKENS.WorkspaceRepository, {
  useClass: WorkspaceRepositoryPrisma,
});

container.register(TOKENS.UserRepository, {
  useClass: UserRepositoryPrisma,
});
