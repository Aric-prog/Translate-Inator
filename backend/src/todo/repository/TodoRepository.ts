import { inject, injectable } from "inversify";
import DbService from "../../database/db.js";
import Todo from "../../database/models/Todo.js";

@injectable()
export default class TodoRepository {
    private readonly db: DbService;

    constructor(@inject(DbService) dbService: DbService) {
        this.db = dbService;
    }

    async createNewTodo(accountid: number, entry: string): Promise<Todo> {
        const { rows } = await this.db.query(
            `
            INSERT INTO todo(accountid, body, isdone) 
            VALUES($1, $2, $3)
            RETURNING *`,
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

    async updateTodoStatus(todoId: number, isDone: boolean): Promise<Todo> {
        const { rows } = await this.db.query(
            `UPDATE todo SET isdone = $1 
            WHERE id = $2 
            RETURNING *`,
            [todoId, isDone]
        );
        return rows[0] as Todo;
    }

    async deleteTodo(todoId: number): Promise<Todo> {
        const { rows } = await this.db.query(
            `DELETE FROM todo 
            WHERE id = $1 AND 
            RETURNING *`,
            [todoId]
        );
        return rows[0] as Todo;
    }
    async deleteMultipleTodo(todoIds: number[]): Promise<void> {
        const { rows } = await this.db.query(
            `DELETE FROM todo 
            WHERE id IN (${todoIds.join(',')})`
        );
    }
}
