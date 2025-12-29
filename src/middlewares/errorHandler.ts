import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/errors/ApiError.js";
import { UserAlreadyExistsError } from "../types/errors/UserAlreadyExistsError.js";

// eslint-disable-next-line
export function errorHandler(error: Error, req: Request, res: Response, _next: NextFunction ) {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof UserAlreadyExistsError) {
        return res.status(409).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}