import type { NoteAdd } from "../types/note.js";
import type { UserId } from "../types/user.js";
import * as noteRepository from "../repositories/noteRepository.js"

export async function createNote(noteData: NoteAdd) {
    const result = await noteRepository.createNote(noteData);
    return result;
};

export async function getAllNotes(userId: UserId) {
    const result = await noteRepository.getAllByUserId(userId);
    return result;
}