import { NextFunction, Request, Response } from "express";
import * as AuthService from "../service/AuthService.js";

import { STATUS_CODE } from "../../constants/httpConstants.js";
import SignUpDTO from "../dto/SignUpDTO.js";

export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await AuthService.signUp(req.body as SignUpDTO);
        return res.status(STATUS_CODE.OK).send(response);
    } catch (e) {
        next(e);
    }
};

export const login = async () => {
    return;
};
