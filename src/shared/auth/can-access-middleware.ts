import type { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import type { RoleName } from "../../identity/domain/entities/role";
import type { AccessValidator } from "./access-validator";

@injectable()
export class CanAccessMiddleware {
  constructor(private validator: AccessValidator) {}

  handle = (roles: RoleName[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      async (req: Request, res: Response, next: NextFunction) => {
        const email = res.locals.subject;

        if (!email) {
          return res.status(403).json({ message: "Access denied" });
        }

        const allowed = await this.validator(email, roles);

        if (!allowed) {
          return res.status(403).json({ message: "Access denied" });
        }

        next();
      };
    };
  };
}
