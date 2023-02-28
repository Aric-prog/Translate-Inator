import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import * as AuthService from "../service/AuthService.js";
import _ from "lodash";

import { HTTP_RESPONSE } from "../constants/httpConstants.js";

export const signUp = async (req: Request, res: Response) => {
    await check("username", "Username field does not exist").exists().run(req);
    await check("password", "Password field does not exist").exists().run(req);
    await check("password", "Password field must contain at least 6 characters")
        .isLength({ min: 6 })
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_RESPONSE.BAD_INPUT).send(errors.array());
    }

    const activityList = await AuthService.signUp("test", "test");

    if (!_.isUndefined(activityList))
        return res.status(HTTP_RESPONSE.OK).send(activityList);
    return res.status(HTTP_RESPONSE.ERROR).send("Unexpected server-side error");
};
