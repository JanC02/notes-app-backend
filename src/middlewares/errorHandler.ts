import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/errors/ApiError.js";
import { DomainError } from "../types/errors/DomainError.js";

// eslint-disable-next-line
export function errorHandler(error: Error, req: Request, res: Response, _next: NextFunction ) {
    if (error instanceof ApiError || error instanceof DomainError) {
        return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}