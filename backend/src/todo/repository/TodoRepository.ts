import { inject, injectable } from "inversify";
import pg from "pg";
import DbService from "../../database/db.js";

@injectable()
export default class TodoRepository{
    private readonly db: pg.Pool;
    
    constructor(@inject(DbService) dbService : DbService) {
        this.db = dbService.db;
    }
    async createNewEntry(entries: string[])  {
        return;
    }

    async updateEntryStatus(entryId: number) {
        return;
    }

    async deleteEntry(entryId: number) {
        return;
    }
}