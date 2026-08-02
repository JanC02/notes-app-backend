import type { Request, Response } from "express";
import { ApiError } from "../types/errors/ApiError.js";
import { registerUserSchema, loginUserSchema } from "../types/user.js";
import * as authService from "../services/authService.js";
import { appConfig } from "../config/config.js";

export async function register(req: Request, res: Response) {
    const parseResult = registerUserSchema.safeParse(req.body);

    if (!parseResult.success) {
        throw new ApiError(400, `${String(parseResult.error.issues[0]?.path[0])}: ${parseResult.error.issues[0]?.message}`);
    }

    const result = await authService.register(parseResult.data);
    res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
    const parseResult = loginUserSchema.safeParse(req.body);

    if (!parseResult.success) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const result = await authService.login(parseResult.data);
    res.status(200)
        .cookie("session", result.sessionId, {
            ...appConfig.session.cookieOptions,
            expires: result.exp
        })
        .json({
            id: result.id,
            email: result.email
        });
}

export async function logout(req: Request, res: Response) {
    const sessionId: string | undefined = req.cookies.session;

    if (sessionId) {
        await authService.logout(sessionId);
    }

    res.status(204).clearCookie("session", appConfig.session.cookieOptions).end();
}
