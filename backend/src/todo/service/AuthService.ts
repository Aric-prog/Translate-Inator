import { insertUser } from "../repository/AuthRepository.js";
import * as jwt from "jsonwebtoken";
import { SECRET } from "../../config/secret.js";
import { createHash, randomBytes } from "crypto";
import NotFoundException from "../../exceptions/NotFoundException.js";
import SignUpDTO from "../dto/SignUpDTO.js";

export const signUp = (signupDto: SignUpDTO): Promise<string> => {
    const [hashedPassword, salt] = createPasswordHash(signupDto.password);
    insertUser(signupDto.email, signupDto.username, hashedPassword, salt);

    const jwtToken = login(signupDto.username, hashedPassword);
    return jwtToken;
};

export const login = async (
    username: string,
    password: string
): Promise<string> => {
    // Authenticate them here by checking if their input = hash
    const userId: number = null;
    if (userId == null) throw new NotFoundException("User not found");
    return jwt.sign({}, SECRET.PRIVATE_KEY, {
        expiresIn: "1d",
    });
};

export const createPasswordHash = (password: string): [string, string] => {
    const salt = randomBytes(3).toString("hex");
    const hashedPassword = createHashFromString(
        createHashFromString(password) + salt
    );
    return [hashedPassword, salt];
};

export const createHashFromString = (input: string) => {
    const hash = createHash("sha256").update(input).digest("hex");
    return hash;
};
