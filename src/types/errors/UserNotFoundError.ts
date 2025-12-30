import { DomainError } from "./DomainError.js";

export class UserNotFoundError extends DomainError {
    readonly statusCode = 404;

    constructor() {
        super('User not found');
    }
}