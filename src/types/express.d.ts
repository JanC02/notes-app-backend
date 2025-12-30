import type { UserResponse } from "./user.js";

declare global {
    namespace Express {
        export interface Request {
            user?: UserResponse
        }
    }
};