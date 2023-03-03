import { check } from "express-validator";

export default class LoginDTO {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
    static validator = [
        check("email", "Email field does not exist").exists(),
        check("password", "Password field does not exist").exists(),
    ];
}
