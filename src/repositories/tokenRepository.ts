import { pool } from "../config/db.js";
import type { TokenSave } from "../types/auth.js";
import type { UserId } from "../types/user.js";

export async function save(tokenData: TokenSave) {
    await pool.query(
        'INSERT INTO refresh_tokens(user_id, refresh_token, issued_at, expires) VALUES ($1, $2, $3, $4)',
        [tokenData.userId, tokenData.tokenHash, tokenData.iat, tokenData.exp]
    );
}

export async function deleteByTokenHash(refreshTokenHash: string): Promise<UserId | null> {
    const result = await pool.query(
        'DELETE FROM refresh_tokens WHERE refresh_token=$1 RETURNING user_id as "userId"',
        [refreshTokenHash]
    );

    return result.rows[0]?.userId || null;
}

export async function deleteAllByUserId(userId: UserId) {
    await pool.query(
        'DELETE FROM refresh_tokens WHERE user_id=$1',
        [userId]
    );
}

export async function deleteExpiredByUserId(userId: UserId) {
    await pool.query(
        'DELETE FROM refresh_tokens WHERE user_id=$1 AND expires < NOW()',
        [userId]
    );
}