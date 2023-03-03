import { check } from "express-validator";

export default class TodoDTO {
    static validator = [
        check("todoId", "todoId field does not exist").exists(),
    ];
}
