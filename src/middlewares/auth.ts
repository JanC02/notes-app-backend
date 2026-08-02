import type { Request, Response, NextFunction } from "express";
import { InvalidTokenError } from "../types/errors/InvalidTokenError.js";

export function auth(req: Request, res: Response, next: NextFunction) {
    // TODO(sesje): odczytać ciastko sesji, sprawdzić w store i ustawić req.user
    console.log('[auth] tu nastąpi weryfikacja sesji');
    return next(new InvalidTokenError());
}
