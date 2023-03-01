import { inject, injectable } from "inversify";
import { Client } from "pg";
import DbService from "../../database/db.js";
import User from "../../database/models/User.js";

@injectable()
export default class AuthRepository {
    private readonly db: Client;
    
    constructor(@inject(DbService) dbService : DbService) {
        this.db = dbService.db;
    }

    async insertUser(
        email: string,
        username: string,
        hashedPassword: string,
        salt: string
    ): Promise<number> {
        const userId = 0;
        return userId;
    }

    async getUserByEmail(email: string): Promise<User> {
        return new User();
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
