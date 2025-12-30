import { DomainError } from "./DomainError.js";

export class ForbiddenError extends DomainError {
    readonly statusCode = 403;

    constructor() {
        super('Forbidden')
    }
}