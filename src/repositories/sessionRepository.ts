import { pool } from "../config/db.js";
import type { SessionSave, SessionFetch } from "../types/auth.js";
import type { UserId } from "../types/user.js";

export async function save(sessionData: SessionSave) {
    await pool.query(
        'INSERT INTO sessions(user_id, session_id_hash, issued_at, expires) VALUES ($1, $2, $3, $4)',
        [sessionData.userId, sessionData.sessionIdHash, sessionData.iat, sessionData.exp]
    );
}

export async function deleteBySessionHash(sessionIdHash: string) {
    await pool.query(
        'DELETE FROM sessions WHERE session_id_hash=$1',
        [sessionIdHash]
    );
}

export async function getBySessionHash(sessionIdHash: string): Promise<SessionFetch | null> {
    const result = await pool.query(
        'SELECT s.user_id AS "userId", u.email AS "email" FROM sessions s INNER JOIN users u ON s.user_id = u.id WHERE s.session_id_hash=$1 AND s.expires > NOW()',
        [sessionIdHash]
    );
    return result.rows[0] || null;
}

export async function deleteAllByUserId(userId: UserId) {
    await pool.query(
        'DELETE FROM sessions WHERE user_id=$1',
        [userId]
    );
}

export async function deleteExpiredByUserId(userId: UserId) {
    await pool.query(
        'DELETE FROM sessions WHERE user_id=$1 AND expires < NOW()',
        [userId]
    );
}