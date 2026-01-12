import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import type { JwtServiceInterface } from "../../domain/security/jwt-service-interface";
import { TOKENS } from "../../infrastructure/container/tokens";
import type { UserRepository } from "../../domain/repositories/user-repository";

@injectable()
export class AuthJwtMiddleware {
  constructor(
    @inject(TOKENS.JwtService)
    private jwtService: JwtServiceInterface,
    @inject(TOKENS.UserRepository)
    private userRepository: UserRepository
  ) {}
  handle = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.cookies["access_token"];

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization cookie missing" });
    }

    const token = authHeader;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const subject = await this.jwtService.getSubjectFromToken(token);

    if (!subject) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await this.userRepository.findByEmail(subject);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!(await this.jwtService.verify(token, user))) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.locals.subject = subject;

    next();
  };
}
