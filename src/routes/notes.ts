import express from "express";
import { add, getAll, get, edit } from "../controllers/noteController.js";

export const notesRouter = express.Router();

notesRouter.post('/', add);
notesRouter.get('/', getAll);
notesRouter.get('/:noteId', get);
notesRouter.put('/:noteId', edit);