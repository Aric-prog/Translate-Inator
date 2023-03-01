import { injectable } from "inversify";
import { Pool } from "pg";
@injectable()
export default class DbService {
    readonly db: Pool;
    constructor() {
        this.db = new Pool();
    }
}
