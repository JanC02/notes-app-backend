import type { UserId } from "./user.js";
import * as z from "zod";

export type TokenPayload = {
    id: UserId;
    email: string;
    iat: number;
    exp: number;
};

export type AuthResponse = {
    id: UserId;
    email: string;
    accessToken: string;
    refreshToken: string;
};

export type TokenResult = {
    token: string;
    tokenPayload: TokenPayload;
};

export type TokenSave = {
    userId: UserId;
    token: string;
    iat: Date;
    exp: Date;
};

export type TokenFetch = {
    refreshToken: string;
};

export type RefreshResult = {
    accessToken: string;
    refreshToken: string;
};

export const logoutSchema = z.object({
    refreshToken: z.string()
});

export const refreshSchema = z.clone(logoutSchema);