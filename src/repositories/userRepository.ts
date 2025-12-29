import { pool } from "../config/db.js";
import type { User, CreateUser, UserResponse } from "../types/user.js";

export async function create(userData: CreateUser): Promise<UserResponse> {
    const res = await pool.query(
        'INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING id, email',
        [userData.email, userData.passwordHash]
    );
    return res.rows[0];
}

export async function getByEmail(email: string): Promise<User | undefined> {
    const res = await pool.query(
        'SELECT * FROM users WHERE email=$1',
        [email]
    );
    return res.rows[0];
}