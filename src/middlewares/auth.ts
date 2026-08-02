import type { Request, Response, NextFunction } from "express";
import { InvalidSessionError } from "../types/errors/InvalidSessionError.js";
import { verify } from "../services/sessionService.js";

export async function auth(req: Request, res: Response, next: NextFunction) {
    const sessionId: string | undefined = req.cookies.session;

    if (!sessionId) {
        throw new InvalidSessionError();
    }

    const verificationResult = await verify(sessionId);

    if (!verificationResult) {
        throw new InvalidSessionError();
    }

    req.user = {
        id: verificationResult.userId,
        email: verificationResult.email
    };

    next();
}
