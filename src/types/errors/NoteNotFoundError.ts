import { DomainError } from "./DomainError.js";

export class NoteNotFoundError extends DomainError {
    readonly statusCode = 404;

    constructor() {
        super('Note not found');
    }
}