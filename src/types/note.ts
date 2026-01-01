import type { UserId } from "./user.js";
import * as z from "zod";

export type Note = {
    id: number;
    userId: UserId;
    title: string;
    content: string;
    createdAt: Date;
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
    title: z.string().min(5),
    content: z.string().min(5)
});

export const editNoteSchema = z.clone(addNoteSchema);