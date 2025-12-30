import { pool } from "../config/db.js";
import type { TokenSave } from "../types/auth.js";

export async function save(tokenData: TokenSave) {
    await pool.query(
        'INSERT INTO refresh_tokens(user_id, refresh_token, issued_at, expires) VALUES ($1, $2, $3, $4)',
        [tokenData.userId, tokenData.token, tokenData.iat, tokenData.exp]
    );
}