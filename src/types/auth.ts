import type { UserId } from "./user.js";

export type TokenSave = {
    userId: UserId;
    tokenHash: string;
    iat: Date;
    exp: Date;
};

export type TokenFetch = {
    refreshTokenHash: string;
};
