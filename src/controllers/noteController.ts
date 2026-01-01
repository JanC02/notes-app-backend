import type { Request, Response } from "express";
import { ApiError } from "../types/errors/ApiError.js";
import { addNoteSchema } from "../types/note.js";
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