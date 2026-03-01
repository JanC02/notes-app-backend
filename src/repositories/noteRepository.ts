import { pool } from "../config/db.js";
import type { Note, NoteId, NoteAdd, NoteResponse, NoteEdit } from "../types/note.js";
import { appConfig } from "../config/config.js";
import type { UserId } from "../types/user.js";

export async function createNote(noteData: NoteAdd): Promise<NoteResponse> {
    const result = await pool.query(
        'INSERT INTO notes(user_id, title, content, created_at) values ($1, $2, $3, NOW()) RETURNING id, title, created_at as "createdAt", is_favorite as "isFavorite"',
        [noteData.userId, noteData.title, noteData.content]
    );
    return result.rows[0];
};

export async function getAllByUserId(userId: UserId, page: number): Promise<{ notes: NoteResponse[]; totalCount: number }> {
    const offset = (page - 1) * appConfig.pagination.pageSize;

    const [notesResult, countResult] = await Promise.all([
        pool.query(
            'SELECT id, title, created_at as "createdAt", is_favorite as "isFavorite" FROM notes WHERE user_id=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
            [userId, appConfig.pagination.pageSize, offset]
        ),
        pool.query(
            'SELECT COUNT(*) FROM notes WHERE user_id=$1',
            [userId]
        ),
    ]);

    return {
        notes: notesResult.rows,
        totalCount: Number(countResult.rows[0].count),
    };
};

export async function getByIdAndUserId(noteId: NoteId, userId: UserId): Promise<Note | null> {
    const result = await pool.query(
        'SELECT id, user_id as "userId", title, content, created_at as "createdAt",  is_favorite as "isFavorite" FROM NOTES WHERE id=$1 AND user_id=$2',
        [noteId, userId]
    );
    return result.rows[0] || null;
};

export async function editNote(noteData: NoteEdit): Promise<boolean> {
    const result = await pool.query(
        'UPDATE notes SET title=$1, content=$2 WHERE id=$3 AND user_id=$4',
        [noteData.title, noteData.content, noteData.id, noteData.userId]
    );

    return result.rowCount! > 0;
}

export async function deleteNote(noteId: NoteId, userId: UserId): Promise<boolean> {
    const result = await pool.query(
        'DELETE FROM notes WHERE id = $1 AND user_id = $2',
        [noteId, userId]
    );
    return result.rowCount! > 0;
}

export async function setIsFavoriteNote(isFavorite: boolean, noteId: NoteId, userId: UserId): Promise<boolean> {
    const result = await pool.query(
        'UPDATE notes SET is_favorite=$1 WHERE id=$2 AND user_id=$3',
        [isFavorite, noteId, userId]
    );
    return result.rowCount! > 0;
}