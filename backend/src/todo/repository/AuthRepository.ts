import { injectable } from "inversify";
import User from "../../database/models/User.js";

@injectable()
export default class AuthRepository {
    async insertUser(
        email: string,
        username: string,
        hashedPassword: string,
        salt: string
    ): Promise<number> {
        const userId = 0;
        return userId;
    }

    async getUserById(userId: number): Promise<User> {
        return new User();
    }

    async grantAdminPrivilege(userId: number) {
        return;
    }

    async isUserAdmin(userId: number): Promise<boolean> {
        this.getUserById(userId);
        return false;
    }
}
