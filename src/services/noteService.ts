import type { NoteAdd } from "../types/note.js";
import * as noteRepository from "../repositories/noteRepository.js"

export async function createNote(noteData: NoteAdd) {
    const result = await noteRepository.createNote(noteData);
    return result;
};