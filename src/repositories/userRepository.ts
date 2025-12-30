import { pool } from "../config/db.js";
import type { User, CreateUser, UserResponse, UserId } from "../types/user.js";

export async function create(userData: CreateUser): Promise<UserResponse> {
    const res = await pool.query(
        'INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING id, email',
        [userData.email, userData.passwordHash]
    );
    return res.rows[0];
}

export async function getByEmail(email: string): Promise<User | null> {
    const res = await pool.query(
        'SELECT id, email, password_hash as "passwordHash" FROM users WHERE email=$1',
        [email]
    );
    return res.rows[0] || null;
}

export async function deleteById(id: UserId) {
    await pool.query(
        'DELETE FROM users WHERE id=$1',
        [id]
    );
}