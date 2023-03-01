import { inject, injectable } from "inversify";
import { Pool } from "pg";
import DbService from "../../database/db.js";
import Account from "../../database/models/Account.js";

@injectable()
export default class AuthRepository {
    private readonly db: Pool;
    
    constructor(@inject(DbService) dbService : DbService) {
        this.db = dbService.db;
    }

    async insertUser(
        email: string,
        username: string,
        hashedPassword: string,
        salt: string
    ): Promise<number> {
        // this.db.
        return;
    }

    async getUserByEmail(email: string): Promise<Account> {
        return new Account();
    }

    async getUserById(userId: number): Promise<Account> {
        return new Account();
    }

    async grantAdminPrivilege(userId: number) {
        return;
    }

    async isUserAdmin(userId: number): Promise<boolean> {
        this.getUserById(userId);
        return false;
    }
}
