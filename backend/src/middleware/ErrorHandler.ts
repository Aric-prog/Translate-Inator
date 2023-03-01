import { NextFunction, Request, Response } from "express";
import InvalidInputException from "../exceptions/InvalidInputException.js";
import NotFoundException from "../exceptions/NotFoundException.js";
import ValidationException from "../exceptions/ValidationException.js";

export const errorHandler = (
    err: InvalidInputException | NotFoundException | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ValidationException)
        res.status(err.statusCode).json(err.errors);
    else if (err instanceof NotFoundException)
        res.status(err.statusCode).json(err.message);
    else res.status(500).json(err.message);
    next();
};
