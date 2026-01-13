import { injectable } from "tsyringe";
import { SaveWorkspaceUseCase } from "../../application/use-cases/save-workspace";
import type { Request, Response } from "express";
import { workspaceSchema } from "../../application/validators/workspace-validator";

@injectable()
export class WorkspaceController {
  constructor(private readonly saveWorkspaceUseCase: SaveWorkspaceUseCase) {}

  save = async (req: Request, res: Response) => {
    const safeParse = workspaceSchema.safeParse(req.body);

    if (!safeParse.success) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: safeParse.error.issues,
      });
    }

    const { name, description } = safeParse.data;
    const ownerSubject = res.locals.subject;
    const workspace = await this.saveWorkspaceUseCase.execute({
      name,
      description,
      ownerSubject,
    });

    res.status(201).json({
      message: "Workspace created successfully",
      workspace,
    });
  };
}
