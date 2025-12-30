import type { Request, Response } from "express";
import * as userService from "../services/userService.js"

export async function deleteUser(req: Request, res: Response) {
    await userService.deleteUser(req.user!);

    res.sendStatus(204);
};