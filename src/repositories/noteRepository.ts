import { pool } from "../config/db.js";
import type { NoteAdd, NoteResponse } from "../types/note.js";

export async function createNote(noteData: NoteAdd): Promise<NoteResponse> {
    const result = await pool.query(
        'INSERT INTO notes(user_id, title, content, created_at) values ($1, $2, $3, NOW()) RETURNING id, title, created_at as "createdAt"',
        [noteData.userId, noteData.title, noteData.content]
    );
    return result.rows[0];
}