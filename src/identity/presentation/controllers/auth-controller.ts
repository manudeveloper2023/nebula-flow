import type { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    res.status(201).json({ message: "User registered successfully" });
};
