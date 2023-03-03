import { NextFunction, Request, Response } from "express";
import DatabaseException from "../exceptions/DatabaseException.js";
import InvalidInputException from "../exceptions/InvalidInputException.js";
import NotFoundException from "../exceptions/NotFoundException.js";
import ValidationException from "../exceptions/ValidationException.js";

export const errorHandler = (
    err: InvalidInputException | DatabaseException | NotFoundException | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);
    if (err instanceof ValidationException)
        return res.status(err.statusCode).json(err.errors);
    else if (err instanceof NotFoundException
        || err instanceof InvalidInputException
        || err instanceof DatabaseException)
        return res.status(err.statusCode).json({ message: err.message });
    return res.status(500).json("Unexpected server side error");
};
