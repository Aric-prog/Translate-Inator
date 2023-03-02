import { inject, injectable } from "inversify";

import TodoRepository from "../repository/TodoRepository.js";
import CreateTodoDTO from "../dto/CreateTodoDTO.js";
import Todo from "../../database/models/Todo.js";

@injectable()
export default class TodoService {
    private readonly todoRepository;
    constructor(@inject(TodoRepository) todoRepository: TodoRepository) {
        this.todoRepository = todoRepository;
    }

    async createTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
        this.todoRepository.createNewTodo(1, createTodoDTO.entry);
        return;
    }

    async getUserTodos(userId : number) : Promise<Todo[]>{
        const todo = this.todoRepository.getTodoByUser(userId);
        return todo;
    }
}
