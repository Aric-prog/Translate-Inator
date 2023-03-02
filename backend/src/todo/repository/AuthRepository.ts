import { inject, injectable } from "inversify";
import pg from "pg";
import DbService from "../../database/db.js";
import Account from "../../database/models/Account.js";

@injectable()
export default class AuthRepository {
    private readonly db: pg.Pool;

    constructor(@inject(DbService) dbService: DbService) {
        this.db = dbService.db;
    }

    async insertUser(
        email: string,
        username: string,
        hashedPassword: string,
        salt: string
    ): Promise<number> {
        const { rows } = await this.db.query(
            `
            INSERT INTO account(email, username, hashedpassword, isadmin, salt) 
            VALUES($1, $2, $3, $4 ,$5) RETURNING ID`,
            [email, username, hashedPassword, false, salt]
        );
        return rows[0].id;
    }

    async getUserByEmail(email: string): Promise<Account> {
        const { rows } = await this.db.query(
            `SELECT * FROM account WHERE email = $1`,
            [email]
        );

        if (rows.length > 0) return rows[0] as Account;
        return null;
    }

    async getUserById(userId: number): Promise<Account> {
        const { rows } = await this.db.query(
            `SELECT * FROM account WHERE id = $1`,
            [userId]
        );
        
        if (rows.length > 0) return rows[0] as Account;
        return null;
    }

    async grantAdminPrivilege(userId: number) {
        return;
    }
}
