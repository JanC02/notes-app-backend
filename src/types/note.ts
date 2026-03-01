import type { UserId } from "./user.js";
import * as z from "zod";

export type Note = {
    id: number;
    userId: UserId;
    title: string;
    content: string;
    createdAt: string;
    isFavorite: boolean;
};

export type NoteAdd = {
    userId: UserId;
    title: string;
    content: string;
};

export type NoteResponse = Omit<Note, 'userId' | 'content'>;
export type NoteId = Note['id'];

export type NoteEdit = {
    id: NoteId;
    userId: UserId;
    title: string;
    content: string;
};

export const addNoteSchema = z.object({
    title: z.string().min(5).max(255),
    content: z.string().min(5).max(10000)
});

export const editNoteSchema = z.clone(addNoteSchema);

export const setIsFavoriteNoteSchema = z.object({
    isFavorite: z.boolean(),
});

export type PaginatedNotes = {
    notes: NoteResponse[];
    totalPages: number;
};