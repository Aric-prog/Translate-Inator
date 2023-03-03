import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";
import ValidationException from "../exceptions/ValidationException.js";

export default class ValidateRequest {
    public readonly dtoValidator: ValidationChain[];

    constructor(dtoValidator: ValidationChain[]) {
        this.dtoValidator = dtoValidator;
    }

    public validatorMiddleware = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        for (const validator of this.dtoValidator) {
            await validator.run(req);
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new ValidationException(errors.array());
            next(err);
        }
        next();
    };
    public static using = (dtoValidator: ValidationChain[]) =>
        new ValidateRequest(dtoValidator).validatorMiddleware;
}
