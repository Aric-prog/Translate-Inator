import { injectable } from "inversify";
import pg from "pg";
import DatabaseException from "../exceptions/DatabaseException.js";
import { PgErrorCallback, PgErrorMap } from "./types.js";
@injectable()
export default class DbService {
    readonly pool: pg.Pool;
    constructor() {
        this.pool = new pg.Pool({
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            database: process.env.POSTGRES_DATABASE,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
        });
    }

    async query(
        query: string,
        values: any[],
        errorMap?: PgErrorMap
    ): Promise<pg.QueryResult<any>> {
        try {
            return await this.pool.query(query, values);
        } catch (err) {
            console.log(errorMap.has(err.code));
            if (err instanceof pg.DatabaseError && errorMap.has(err.code)) {
                const pgError: string = errorMap.get(err.code);
                throw new DatabaseException(pgError);
            } else if (err instanceof pg.DatabaseError) {
                throw new Error("Unexpected db error : " + err.detail);
            }
        }
    }
}
