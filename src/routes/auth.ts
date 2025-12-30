import express from "express";
import { register, login, logout, refresh } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/refresh', refresh);