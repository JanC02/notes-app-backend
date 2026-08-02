import { randomBytes } from "node:crypto";
import { save, getBySessionHash, deleteExpiredByUserId } from "../repositories/sessionRepository.js";
import type { SessionCreate, SessionFetch } from "../types/auth.js";
import type { UserId } from "../types/user.js";
import { appConfig } from "../config/config.js";
import { hashSessionId } from "../utils/hash.js";

export async function create(userId: UserId): Promise<SessionCreate> {
    const sessionId = randomBytes(32).toString("hex");
    const sessionIdHash = hashSessionId(sessionId);

    const now = Date.now();
    const exp = new Date(now + appConfig.session.maxAge);

    await save({
        userId,
        sessionIdHash,
        iat: new Date(now),
        exp
    });

    await deleteExpiredByUserId(userId);

    return {
        sessionId: sessionId,
        exp: exp
    };
}

export async function verify(sessionId: string): Promise<SessionFetch| null> {
    return await getBySessionHash(
        hashSessionId(sessionId)
    );
}