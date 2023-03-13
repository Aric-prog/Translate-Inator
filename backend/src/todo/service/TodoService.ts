import { inject, injectable } from "inversify";

import TodoRepository from "../repository/TodoRepository.js";
import CreateTodoDTO from "../dto/CreateTodoDTO.js";
import Todo from "../../database/models/Todo.js";
import TranslateService from "./TranslateService.js";

@injectable()
export default class TodoService {
    private readonly todoRepository;
    private readonly translateService;
    constructor(
        @inject(TodoRepository) todoRepository: TodoRepository,
        @inject(TranslateService) translateService: TranslateService) {

        this.todoRepository = todoRepository;
        this.translateService = translateService;
    }

    async createTodo(accountId: number, createTodoDTO: CreateTodoDTO): Promise<Todo> {
        const todo: Todo = await this.todoRepository.createNewTodo(accountId, createTodoDTO.entry);
        return todo;
    }

    async deleteUserTodo(accountId: number, todoId: number): Promise<Todo> {
        const todos: Todo[] = await this.todoRepository.getTodoByUser(accountId);
        const todo: Todo = await this.todoRepository.getTodoById(todoId);
        if (todos.includes(todo)) return await this.todoRepository.deleteTodo(todoId);
    }

    async deleteUserTodos(accountId: number, todoId: number[]): Promise<void> {
        const todos: number[] = await (await this.todoRepository.getTodoByUser(accountId)).map(i => i.id);
        const doesAllTodosBelongToUser: boolean = todoId.every(i => todos.includes(i));
        if (doesAllTodosBelongToUser) return await this.todoRepository.deleteMultipleTodo(todoId);
    }

    async getUserTodos(accountId: number): Promise<Todo[]> {
        const todos = await this.todoRepository.getTodoByUser(accountId);
        return todos;
    }

    async userOwnsTodo(accountId: number, todoId: number): Promise<boolean> {
        const userTodos: Todo[] = await this.todoRepository.getTodoByUser(accountId);
        const todo: Todo = await this.todoRepository.getTodoById(todoId);
        return userTodos.includes(todo);
    }

    async toggleTodo(accountId: number, todoId: number): Promise<Todo> {
        if (!this.userOwnsTodo(accountId, todoId)) return;
        const todo: Todo = await this.todoRepository.getTodoById(todoId);
        return await this.todoRepository.updateTodoStatus(todoId, !todo.isdone);
    }

}
