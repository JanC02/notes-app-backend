import { DomainError } from "./DomainError.js"

export class InvalidCredentialsError extends DomainError {
    readonly statusCode = 401;

    constructor() {
        super('Invalid credentials')
    }
}