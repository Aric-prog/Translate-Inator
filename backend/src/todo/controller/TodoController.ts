import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";

import { STATUS_CODE } from "../../constants/HttpConstants.js";
import { authenticated } from "../../middleware/Authenticated.js";
import ValidateRequest from "../../middleware/ValidateRequest.js";
import CreateTodoDTO from "../dto/CreateTodoDTO.js";
import TodoDTO from "../dto/TodoDTO.js";
import TodoService from "../service/TodoService.js";

@controller("", authenticated)
export default class TodoController {
    private readonly todoService: TodoService;
    constructor(@inject(TodoService) todoService: TodoService) {
        this.todoService = todoService;
    }

    @httpPost("/todo", ValidateRequest.using(CreateTodoDTO.validator))
    async createTodo(req: Request, res: Response) {
        const response = await this.todoService.createTodo(
            res.locals.decodedToken.uid,
            req.body as CreateTodoDTO
        );
        return res.status(STATUS_CODE.OK).json(response);
    }

    @httpGet("/todo")
    async getTodo(req: Request, res: Response) {
        const response = await this.todoService.getUserTodos(res.locals.decodedToken.uid);
        return res.status(STATUS_CODE.OK).json(response);
    }

    @httpDelete("/todo", ValidateRequest.using(TodoDTO.validator))
    async deleteTodo(req: Request, res: Response) {
        const response = await this.todoService.deleteUserTodo(res.locals.decodedToken.uid, req.body.todoId);
        return res.status(STATUS_CODE.OK).json(response);
    }
}
