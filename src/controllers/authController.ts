import type { Request, Response } from "express";
import { ApiError } from "../types/errors/ApiError.js";
import { registerUserSchema, loginUserSchema } from "../types/user.js";
import { logoutSchema } from "../types/auth.js";
import * as authService from "../services/authService.js";

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
        .cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            expires: result.exp,
            path: '/api/auth',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production' ? true : false
        })
        .json({ accessToken: result.accessToken });
}

export async function logout(req: Request, res: Response) {
    const parseResult = logoutSchema.safeParse(req.body);

    if (!parseResult.success) {
        throw new ApiError(400, 'Token is required');
    }

    await authService.logout(parseResult.data.refreshToken);
    res.sendStatus(204);
}

export async function refresh(req: Request, res: Response) {
    const refreshToken: string | undefined = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new ApiError(400, 'Token is required');
    }

    const result = await authService.refresh(refreshToken);
    res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            expires: result.exp,
            path: '/api/auth',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production' ? true : false
        }).json({ accessToken: result.accessToken });
}