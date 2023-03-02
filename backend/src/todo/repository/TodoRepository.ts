import { inject, injectable } from "inversify";
import pg from "pg";
import DbService from "../../database/db.js";
import Todo from "../../database/models/Todo.js";

@injectable()
export default class TodoRepository {
    private readonly db: pg.Pool;

    constructor(@inject(DbService) dbService: DbService) {
        this.db = dbService.db;
    }

    async createNewTodo(accountid: number, entry: string) {
        const { rows } = await this.db.query(
            `
            INSERT INTO todo(accountid, body, isdone) 
            VALUES($1, $2, $3)`,
            [accountid, entry, false]
        );
        return;
    }

    async getTodoByUser(accountid: number) : Promise<Todo[]> {
        const { rows } = await this.db.query(
            `SELECT * FROM todo WHERE accountid = $1`,
            [accountid]
        );
        console.log(rows[0]);
        return;
    }

    async getTodoById(todoId: number): Promise<Todo> {
        const { rows } = await this.db.query(
            `SELECT * FROM todo WHERE id = $1`,
            [todoId]
        );
        return;
    }

    async updateTodoStatus(todoId: number, isDone: boolean) {
        const { rows } = await this.db.query(``, [todoId, isDone]);
        return;
    }

    async deleteTodo(todoId: number) {
        const { rows } = await this.db.query(``, [todoId]);
        return;
    }
}
