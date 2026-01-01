import { pool } from "../config/db.js";
import type { Note, NoteId, NoteAdd, NoteResponse } from "../types/note.js";
import type { UserId } from "../types/user.js";

export async function createNote(noteData: NoteAdd): Promise<NoteResponse> {
    const result = await pool.query(
        'INSERT INTO notes(user_id, title, content, created_at) values ($1, $2, $3, NOW()) RETURNING id, title, created_at as "createdAt"',
        [noteData.userId, noteData.title, noteData.content]
    );
    return result.rows[0];
};

export async function getAllByUserId(userId: UserId): Promise<NoteResponse[]> {
    const result = await pool.query(
        'SELECT id, title, created_at as "createdAt" FROM NOTES WHERE user_id=$1',
        [userId]
    );
    return result.rows;
};

export async function getByIdAndUserId(noteId: NoteId, userId: UserId): Promise<Note | undefined> {
    const result = await pool.query(
        'SELECT id, user_id as "userId", title, content, created_at as "createdAt" FROM NOTES WHERE id=$1 AND user_id=$2',
        [noteId, userId]
    );
    return result.rows[0];
}