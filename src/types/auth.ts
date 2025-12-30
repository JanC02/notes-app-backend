import type { UserId } from "./user.js";
import * as z from "zod";

export type TokenPayload = {
    id: number;
    email: string;
    iat: number;
    exp: number;
};

export type AuthResponse = {
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
    accessToken: string;
};

export type RefreshResult = {
    accessToken: string;
};

export const logoutSchema = z.object({
    refreshToken: z.string()
});

export const refreshSchema = z.clone(logoutSchema);