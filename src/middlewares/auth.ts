import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";

export function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || Array.isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const token = authHeader.split(' ')[1];

     if (!token) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const payload = verifyAccessToken(token);

    if (!payload) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = {
        id: payload.id,
        email: payload.email
    };
    
    next();
}
