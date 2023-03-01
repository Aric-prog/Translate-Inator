import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";

import { STATUS_CODE } from "../../constants/httpConstants.js";
import SignUpDTO from "../dto/SignUpDTO.js";
import AuthService from "../service/AuthService.js";

@controller("/auth")
export default class AuthController {
    private readonly authService: AuthService;
    constructor(@inject(AuthService) authService: AuthService) {
        this.authService = authService;
    }


    @httpPost("/signup")
    async signUp(req: Request, res: Response) {
        const response = await this.authService.signUp(req.body as SignUpDTO);
        return res.status(STATUS_CODE.OK).json(response);
    }
}
