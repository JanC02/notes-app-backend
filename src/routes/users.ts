import express from "express";
import { deleteUser, fetchUserData } from "../controllers/userController.js"

export const usersRouter = express.Router();

usersRouter.delete('/me', deleteUser);
usersRouter.get('/me', fetchUserData);