import type { Request, Response } from "express";
import * as userService from "../services/userService.js"

export async function deleteUser(req: Request, res: Response) {
    await userService.deleteUser(req.user!);

    res.sendStatus(204);
};

export async function fetchUserData(req: Request, res: Response) {
    const result = await userService.fetchUserData(req.user!.email);

    res.json(result);
}