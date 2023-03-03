import { ValidationError } from "express-validator";

export default class ValidationException extends Error {
    public readonly statusCode: number = 422;
    public readonly errors: ValidationError[];
    constructor(errors: ValidationError[]) {
        super();
        this.errors = errors;
    }
}
