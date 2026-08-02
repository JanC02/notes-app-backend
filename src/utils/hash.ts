import { hash } from "node:crypto";

export function hashSessionId(sessionId: string): string {
    return hash('sha256', sessionId, 'hex');
}
