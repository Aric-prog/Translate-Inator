import { inject, injectable } from "inversify";
import pg from "pg";
import DbService from "../../database/db.js";
import Account from "../../database/models/Account.js";

@injectable()
export default class AuthRepository {
    private readonly db: pg.Pool;
    
    constructor(@inject(DbService) dbService : DbService) {
        this.db = dbService.db;
    }

    async insertUser(
        email: string,
        username: string,
        hashedPassword: string,
        salt: string
    ): Promise<number> {
        const res = await this.db.query(`
            INSERT INTO account(email, username, hashedpassword, isadmin, salt) 
            VALUES($1, $2, $3, $4 ,$5)`,
            [email, username, hashedPassword, false, salt]
        );
        console.log(res);
        return;
    }

    async getUserByEmail(email: string): Promise<Account> {
        const res = await this.db.query("SELECT * FROM account WHERE email = $1", [email]);
        return new Account();
    }

    async getUserById(userId: number): Promise<Account> {
        await this.db.query(`
            INSERT INTO account(email, username, hashedpassword, isadmin, salt) 
            VALUES('test@gmail.com', 'jlk', ';;cry', true, 'lmao');`
        );
        const res = await this.db.query("SELECT * FROM account WHERE id = $1", [userId]);
        console.log(res);
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
