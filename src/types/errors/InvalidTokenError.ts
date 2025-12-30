import { DomainError } from "./DomainError.js";

export class InvalidTokenError extends DomainError {
    readonly statusCode = 401;

    constructor() {
        super('Invalid token');
    }
}