import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { STATUS_CODE } from "../../constants/HttpConstants.js";

import { authenticated } from "../../middleware/Authenticated.js";
import ValidateRequest from "../../middleware/ValidateRequest.js";
import TranslateDTO from "../dto/TranslateDTO.js";
import TranslateService from "../service/TranslateService.js";

@controller("", authenticated)
export default class TranslateController {
    private readonly translateService: TranslateService;
    constructor(@inject(TranslateService) translateService: TranslateService) {
        this.translateService = translateService;
    }

    @httpPost("/translate", ValidateRequest.using(TranslateDTO.validator))
    async translateText(req: Request, res: Response) {
        const response = await this.translateService.translateText(
            req.body as TranslateDTO
        );
        return res.status(STATUS_CODE.OK).json({ translation: response });
    }
}
