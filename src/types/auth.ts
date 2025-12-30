import type { UserId } from "./user.js";

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