import { check } from "express-validator";

export default class TodoDTO {
    static idValidator = [
        check("todoId", "todoId field does not exist").exists(),
    ];
}
