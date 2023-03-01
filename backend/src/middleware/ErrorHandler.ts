import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException.js";
import NotFoundException from "../exceptions/NotFoundException.js";
import ValidationException from "../exceptions/ValidationException.js";

export const errorHandler = (
    err: NotFoundException | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ValidationException)
        res.status(err.statusCode).send(err.errors);
    else if (err instanceof HttpException)
        res.status(err.statusCode).send(err.message);
    else res.status(500).send(err.message);
    next();
};
