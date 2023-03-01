import AuthRepository from "../repository/AuthRepository.js";
import * as jwt from "jsonwebtoken";
import { SECRET } from "../../config/secret.js";
import { createHash, randomBytes } from "crypto";
import NotFoundException from "../../exceptions/NotFoundException.js";
import SignUpDTO from "../dto/SignUpDTO.js";
import { injectable } from "inversify";
import User from "../../database/models/User.js";
import InvalidInputException from "../../exceptions/InvalidInputException.js";

@injectable()
export default class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    async signUp(signupDto: SignUpDTO): Promise<string> {
        const [hashedPassword, salt] = this.createNewPasswordHash(
            signupDto.password
        );
        this.authRepository.insertUser(
            signupDto.email,
            signupDto.username,
            hashedPassword,
            salt
        );

        const jwtToken = await this.login(signupDto.email, hashedPassword);
        return jwtToken;
    }
    async login(email: string, password: string): Promise<string> {
        // Authenticate them here by checking if their input = hash
        const userId: number = null;
        const user: User = await this.authRepository.getUserById(userId);

        if (!user) throw new NotFoundException("Invalid login credentials");
        if (this.createPasswordHash(password, user.salt) != user.hashedPassword)
            throw new InvalidInputException("Invalid login credentials");

        return jwt.sign({}, SECRET.PRIVATE_KEY, {
            expiresIn: "1d",
        });
    }

    createPasswordHash(password: string, salt: string) {
        const hashedPassword = this.createHashFromString(
            this.createHashFromString(password) + salt
        );
        return hashedPassword;
    }

    createNewPasswordHash(password: string): [string, string] {
        const salt = randomBytes(3).toString("hex");
        const hashedPassword = this.createPasswordHash(password, salt);
        return [hashedPassword, salt];
    }

    createHashFromString(input: string): string {
        const hash = createHash("sha256").update(input).digest("hex");
        return hash;
    }
}
