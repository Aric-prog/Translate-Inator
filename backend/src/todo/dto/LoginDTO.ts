import { check } from "express-validator";

export default class LoginDTO {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    static validator = [
        check("username", "Username field does not exist").exists(),
        check("password", "Password field does not exist").exists(),
    ];
}
