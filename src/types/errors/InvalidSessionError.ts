import { DomainError } from "./DomainError.js";

export class InvalidSessionError extends DomainError {
    readonly statusCode = 401;

    constructor() {
        super('Invalid Session');
    }
}