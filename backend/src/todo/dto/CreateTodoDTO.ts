import { check } from "express-validator";

export default class CreateTodoDTO {
    
    entry: string;

    constructor(entry: string) {
        this.entry = entry;
    }
    static validator = [
        check("entry", "Entry field does not exist").exists(),
    ];
}
