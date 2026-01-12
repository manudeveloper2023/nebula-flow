import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../infrastructure/container/tokens";
import type { UserRepository } from "../../domain/repositories/user-repository";
import type { RoleName } from "../../domain/entities/role";

@injectable()
export class CanAccessMiddleware {
  constructor(
    @inject(TOKENS.UserRepository) private userRepository: UserRepository
  ) {}

  handle = (roles: RoleName[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      async (req: Request, res: Response, next: NextFunction) => {
        const email = res.locals.subject;
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
          return res.status(403).json({ message: "Access denied" });
        }

        if (!user.canAccess(roles)) {
          return res.status(403).json({ message: "Access denied" });
        }

        next();
      };
    };
  };
}
