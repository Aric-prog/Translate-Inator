import { injectable } from "inversify";
import { Client } from "pg";
@injectable()
export default class DbService {
    readonly db: Client;
    constructor() {
        this.db = new Client();
    }

    async connect() {
        return await this.db.connect();    
    }
}
