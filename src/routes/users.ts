import express from "express";
import { deleteUser } from "../controllers/userController.js"

export const usersRouter = express.Router();

usersRouter.delete('/me', deleteUser);