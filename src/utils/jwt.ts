import jwt from "jsonwebtoken";
import type { UserResponse } from "../types/user.js";
import type { TokenPayload, TokenResult } from "../types/auth.js";
import { getEnv } from "./getEnv.js";

function generateToken(payload: TokenPayload, secret: string): string {
    return jwt.sign(payload, secret, { algorithm: 'HS256' });
}

export function generateAccessToken(userData: UserResponse): TokenResult {
    const now = Date.now();
    const iat = Math.floor(now / 1000);
    const exp = iat + 15 * 60;

    const payload = {
        id: userData.id,
        email: userData.email,
        iat,
        exp
    };

    const token = generateToken(payload, getEnv('ACCESS_TOKEN_SECRET'));

    return {
        token,
        tokenPayload: payload
    };
}

export function generateRefreshToken(userData: UserResponse): TokenResult {
    const now = Date.now();
    const iat = Math.floor(now / 1000);
    const exp = iat + 7 * 24 * 60 * 60;

    const payload = {
        id: userData.id,
        email: userData.email,
        iat,
        exp
    };

    const token = generateToken(payload, getEnv('REFRESH_TOKEN_SECRET'));

    return {
        token,
        tokenPayload: payload
    };
}

function verifyToken(token: string, secret: string): TokenPayload | null {
    try {
        const result = jwt.verify(token, secret, { algorithms: ['HS256'] }) as TokenPayload;
        return result;
    } catch(error) {
        console.error(error);
        return null;
    }
}

export function verifyAccessToken(token: string): TokenPayload | null {
    return verifyToken(token, getEnv('ACCESS_TOKEN_SECRET'));
}

export function verifyRefreshToken(token: string): TokenPayload | null {
    return verifyToken(token, getEnv('REFRESH_TOKEN_SECRET'));
}