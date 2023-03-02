import { inject, injectable } from "inversify";
import pg from "pg";
import DbService from "../../database/db.js";
import Todo from "../../database/models/Todo.js";

@injectable()
export default class TodoRepository {
    private readonly db: pg.Pool;

    constructor(@inject(DbService) dbService: DbService) {
        this.db = dbService.pool;
    }

    async createNewTodo(accountid: number, entry: string) {
        const { rows } = await this.db.query(
            `
            INSERT INTO todo(accountid, body, isdone) 
            VALUES($1, $2, $3)`,
            [accountid, entry, false]
        );
        return rows[0] as Todo;
    }

    async getTodoByUser(accountid: number): Promise<Todo[]> {
        const { rows } = await this.db.query(
            `SELECT * FROM todo 
            WHERE accountid = $1`,
            [accountid]
        );
        return rows as Todo[];
    }

    async getTodoById(todoId: number): Promise<Todo> {
        const { rows } = await this.db.query(
            `SELECT * FROM todo 
            WHERE id = $1`,
            [todoId]
        );
        return rows[0] as Todo;
    }

    async updateTodoStatus(todoId: number, isDone: boolean): Promise<number> {
        const { rows } = await this.db.query(
            `UPDATE todo SET isdone = $1 
            WHERE id = $2 
            RETURNING id`,
            [todoId, isDone]
        );
        return rows[0].id;
    }

    async deleteTodo(todoId: number): Promise<Todo> {
        const { rows } = await this.db.query(
            `DELETE FROM todo 
            WHERE id = $1 
            RETURNING *`,
            [todoId]
        );
        return rows[0] as Todo;
    }
}
