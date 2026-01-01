import express from "express";
import { add, getAll } from "../controllers/noteController.js";

export const notesRouter = express.Router();

notesRouter.post('/', add);
notesRouter.get('/', getAll)