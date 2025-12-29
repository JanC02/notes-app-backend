import jwt, { type SignOptions } from "jsonwebtoken";
import type { UserResponse } from "../types/user.js";
import type { AuthPayload } from "../types/auth.js";
import { getEnv } from "./getEnv.js";

function generateToken(userData: UserResponse, secret: string, expiresIn: SignOptions['expiresIn']): string {
    return jwt.sign({ id: userData.id, email: userData.email }, secret, { expiresIn: expiresIn });
}

export function generateAccessToken(userData: UserResponse) {
    return generateToken(userData, getEnv('ACCESS_TOKEN_SECRET'), '15m');
}

export function generateRefreshToken(userData: UserResponse) {
    return generateToken(userData, getEnv('REFRESH_TOKEN_SECRET'), '7d');
}

function verifyToken(token: string, secret: string): AuthPayload | null {
    try {
        const result = jwt.verify(token, secret) as AuthPayload;
        return result;
    } catch(error) {
        console.error(error);
        return null;
    }
}

export function verifyAccessToken(token: string): AuthPayload | null {
    return verifyToken(token, getEnv('ACCESS_TOKEN_SECRET'));
}

export function verifyRefreshToken(token: string): AuthPayload | null {
    return verifyToken(token, getEnv('REFRESH_TOKEN_SECRET'));
}