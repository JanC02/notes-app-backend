import { pool } from "../config/db.js";
import type { User, CreateUser } from "../types/user.js";

export async function create(userData: CreateUser): Promise<User> {
    const res = await pool.query(
        'INSERT INTO users(email, password_hash) VALUES($1, $2)',
        [userData.email, userData.passwordHash]
    );
    return res.rows[0];
}