import express from "express";
import { add } from "../controllers/noteController.js";

export const notesRouter = express.Router();

notesRouter.post('/', add)