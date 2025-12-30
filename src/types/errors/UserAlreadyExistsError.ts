import { DomainError } from "./DomainError.js";

export class UserAlreadyExistsError extends DomainError {
    readonly statusCode = 409;

    constructor() {
        super('User already exists');
    }
}