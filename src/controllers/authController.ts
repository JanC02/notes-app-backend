import type { Request, Response } from "express";
import { ApiError } from "../types/errors/ApiError.js";
import { registerUserSchema } from "../types/user.js";
import * as authService from "../services/authService.js";

export async function register(req: Request, res: Response) {
    const parseResult = registerUserSchema.safeParse(req.body);

    if (!parseResult.success) {
        throw new ApiError(400, `${String(parseResult.error.issues[0]?.path[0])}: ${parseResult.error.issues[0]?.message}`);
    }

    const result = await authService.register(parseResult.data);
    res.status(201).json(result);
}