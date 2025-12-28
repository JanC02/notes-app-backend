import type { Request, Response } from "express";
import { ApiError } from "../types/ApiError.js";

export function errorHandler(error: Error, req: Request, res: Response) {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}