import { pool } from "../config/db.js";
import type { TokenSave, TokenFetch } from "../types/auth.js";

export async function save(tokenData: TokenSave) {
    await pool.query(
        'INSERT INTO refresh_tokens(user_id, refresh_token, issued_at, expires) VALUES ($1, $2, $3, $4)',
        [tokenData.userId, tokenData.token, tokenData.iat, tokenData.exp]
    );
}

export async function deleteByToken(refreshToken: string) {
    await pool.query(
        'DELETE FROM refresh_tokens WHERE refresh_token=$1',
        [refreshToken]
    );
}

export async function getByToken(refreshToken: string): Promise<TokenFetch | null> {
    const result = await pool.query(
        'SELECT refresh_token as "refreshToken" from refresh_tokens where refresh_token=$1',
        [refreshToken]
    );
    return result.rows[0] || null;
}