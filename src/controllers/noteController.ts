import type { Request, Response } from "express";
import { ApiError } from "../types/errors/ApiError.js";
import { addNoteSchema, editNoteSchema } from "../types/note.js";
import * as noteService from "../services/noteService.js";

export async function add(req: Request, res: Response) {
    const parseResult = addNoteSchema.safeParse(req.body);
    
    if (!parseResult.success) {
        throw new ApiError(400, `${String(parseResult.error.issues[0]?.path[0])}: ${parseResult.error.issues[0]?.message}`);
    }

    const result = await noteService.createNote({
        userId: req.user!.id,
        title: parseResult.data.title,
        content: parseResult.data.content
    });

    res.status(201).json(result);
}

export async function getAll(req: Request, res: Response) {
    const result = await noteService.getAllNotes(req.user!.id);

    res.json(result);
}

export async function get(req: Request, res: Response) {
    const noteId = Number(req.params.noteId);

    if (isNaN(noteId)) {
        throw new ApiError(400, 'Invalid note id');
    }

    const result = await noteService.getNote(noteId, req.user!.id);

    res.json(result);
}

export async function edit(req: Request, res: Response) {
    const noteId = Number(req.params.noteId);

    if (isNaN(noteId)) {
        throw new ApiError(400, 'Invalid note id');
    }

    const parseResult = editNoteSchema.safeParse(req.body);

    if (!parseResult.success) {
        throw new ApiError(400, `${String(parseResult.error.issues[0]?.path[0])}: ${parseResult.error.issues[0]?.message}`);
    }

    await noteService.editNote({
        id: noteId,
        userId: req.user!.id,
        title: parseResult.data.title,
        content: parseResult.data.content
    });

    res.sendStatus(204);
}

export async function deleteNote(req: Request, res: Response) {
    const noteId = Number(req.params.noteId);

    if (isNaN(noteId)) {
        throw new ApiError(400, 'Invalid note id');
    }

    await noteService.deleteNote(noteId, req.user!.id);

    res.sendStatus(204);
}