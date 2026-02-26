import type { NoteAdd, NoteId, NoteEdit, PaginatedNotes } from "../types/note.js";
import { appConfig } from "../config/config.js";
import type { UserId } from "../types/user.js";
import * as noteRepository from "../repositories/noteRepository.js";
import { NoteNotFoundError } from "../types/errors/NoteNotFoundError.js";

export async function createNote(noteData: NoteAdd) {
    const result = await noteRepository.createNote(noteData);
    return result;
};

export async function getAllNotes(userId: UserId, page: number): Promise<PaginatedNotes> {
    const { notes, totalCount } = await noteRepository.getAllByUserId(userId, page);

    return {
        notes,
        totalPages: Math.ceil(totalCount / appConfig.pagination.pageSize),
    };
};

export async function getNote(noteId: NoteId, userId: UserId) {
    const result = await noteRepository.getByIdAndUserId(noteId, userId);

    if (!result) {
        throw new NoteNotFoundError();
    }

    return result;
}

export async function editNote(noteData: NoteEdit) {
    const updated = await noteRepository.editNote(noteData);

    if (!updated) {
        throw new NoteNotFoundError();
    }
}

export async function deleteNote(noteId: NoteId, userId: UserId) {
    const deleted = await noteRepository.deleteNote(noteId, userId);

    if (!deleted) {
        throw new NoteNotFoundError();
    }
}

export async function setIsFavoriteNote(noteId: NoteId, userId: UserId, isFavorite: boolean) {
    const result = await noteRepository.setIsFavoriteNote(isFavorite, noteId, userId);

    if (!result) {
        throw new NoteNotFoundError();
    }
}