/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from "inversify";
import pg from "pg";
import DatabaseException from "../exceptions/DatabaseException.js";
import { PgErrorMap } from "./types.js";
@injectable()
export default class DbService {
    readonly pool: pg.Pool;
    constructor() {
        this.pool = new pg.Pool({
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            database: process.env.POSTGRES_DB,
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
            if (errorMap && err instanceof pg.DatabaseError && errorMap.has(err.code)) {
                const pgError: string = errorMap.get(err.code);
                throw new DatabaseException(pgError);
            } else if (err instanceof pg.DatabaseError) {
                throw new Error(err.detail);
            }
        }
    }

    async testConnection(): Promise<void> {
        this.pool.connect();
    }
}
