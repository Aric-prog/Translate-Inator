import AuthRepository from "../repository/AuthRepository.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config/Secret.js";
import { createHash, randomBytes } from "crypto";
import SignUpDTO from "../dto/SignUpDTO.js";
import { inject, injectable } from "inversify";
import Account from "../../database/models/Account.js";
import InvalidInputException from "../../exceptions/InvalidInputException.js";
import LoginDTO from "../dto/LoginDTO.js";

@injectable()
export default class AuthService {
    private readonly authRepository;
    constructor(@inject(AuthRepository) authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async signUp(signupDto: SignUpDTO): Promise<string> {
        const [hashedPassword, salt] = this.createNewPasswordHash(
            signupDto.password
        );

        const id: number = await this.authRepository.insertUser(
            signupDto.email,
            signupDto.username,
            hashedPassword,
            salt
        );


        return jwt.sign({ uid: id }, SECRET.PRIVATE_KEY, {
            expiresIn: "1d",
        });
    }

    async login(loginDTO: LoginDTO) {
        // Authenticate them here by checking if their input = hash
        const user: Account = await this.authRepository.getUserByEmail(loginDTO.email);
        if (!user) throw new InvalidInputException("Invalid login credentials");
        if (this.createPasswordHash(loginDTO.password, user.salt) !== user.hashedpassword)
            throw new InvalidInputException("Invalid login credentials");

        const jwtToken = jwt.sign({ uid: user.id }, SECRET.PRIVATE_KEY, {
            expiresIn: "1d",
        });

        return {
            token: jwtToken,
            email: user.email,
            username: user.username,
        };
    }

    async getUserByEmail(email: string): Promise<Account> {
        return this.authRepository.getUserByEmail(email);
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
