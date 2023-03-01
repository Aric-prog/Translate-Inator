import { check, oneOf } from "express-validator";
import User from "../../models/User.js";

export default class SignUpDTO {
    username: string;
    password: string;
    email: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    static validator = [
        check("email", "Email field does not exist").exists(),
        check("email", "Password field does not exist")
            .isEmail()
            .normalizeEmail(),
        check("username", "Username field does not exist").exists(),
        check("password", "Password field does not exist").exists(),
        check(
            "password",
            "Password field must contain at least 6 characters"
        ).isLength({ min: 6 }),
    ];
}
