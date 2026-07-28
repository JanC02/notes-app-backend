import { hash } from "node:crypto";

export function hashToken(token: string): string {
    return hash('sha256', token, 'hex');
}
