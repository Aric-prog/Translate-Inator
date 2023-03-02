import { injectable } from "inversify";
import pg from 'pg';
@injectable()
export default class DbService {
    readonly db: pg.Pool;
    constructor() {
        this.db = new pg.Pool({
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            database: process.env.POSTGRES_DATABASE,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD 
        });
    }
}
