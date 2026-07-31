import type { UserId } from "./user.js";
import * as z from "zod";

export type TokenPayload = {
    id: UserId;
    email: string;
    jti: string;
    iat: number;
    exp: number;
};

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    exp: Date;
};

export type TokenResult = {
    token: string;
    tokenPayload: TokenPayload;
};

export type TokenSave = {
    userId: UserId;
    tokenHash: string;
    iat: Date;
    exp: Date;
};

export type TokenFetch = {
    refreshTokenHash: string;
};

export type RefreshResult = {
    accessToken: string;
    refreshToken: string;
    exp: Date;
};

export const logoutSchema = z.object({
    refreshToken: z.string()
});