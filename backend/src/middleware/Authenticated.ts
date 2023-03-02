import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/Secret.js";
import { STATUS_CODE } from "../constants/httpConstants.js";

export const authenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;
    
    if(!header) return res.status(STATUS_CODE.FORBIDDEN).json({message : "JWT token not provided"});
    if(header.split(" ")[0] !== "Bearer") return res.status(STATUS_CODE.FORBIDDEN).json({message : "Malformed JWT token"});

    const token = header.split(" ")[1];
    jwt.verify(token, SECRET.PRIVATE_KEY, (err, decodedToken) => {
        if(err) next(err);

        res.locals.decodedToken = decodedToken;
        next();
    });
};
