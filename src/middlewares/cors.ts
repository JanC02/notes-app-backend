import type { Request, Response, NextFunction } from "express";
import { appConfig } from "../config/config.js";

export function cors(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', appConfig.corsOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
}