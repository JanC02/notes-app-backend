import type { UserId } from "./user.js";

export type SessionSave = {
    userId: UserId;
    sessionIdHash: string;
    iat: Date;
    exp: Date;
};

export type SessionCreate = {
    sessionId: string;
    exp: Date;
};

export type SessionFetch = {
    userId: UserId;
    email: string;
};

export type LoginResponse = {
    id: UserId;
    email: string;
    exp: Date;
    sessionId: string;
};