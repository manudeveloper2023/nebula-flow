import type { NextFunction, Request, Response } from "express";
import { UserNotFoundError } from "../../domain/errors/user-not-found";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof UserNotFoundError) {
        return res.status(404).json({
            message: err.message,
        });
    }
    return res.status(500).json({
        message: "Internal server error",
        err: err.message,
    });
};
