import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class TodoService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) { }

  getTodoList() {
    // Save JWT sent from server in localstorage
    return this.apiService.get('/todo')
  }

  insertTodo(body: string) {
    return this.apiService.post('/todo', { entry: body })
  }

  deleteTodoList(todoId: string[]) {
    return this.apiService.delete('/todos', { todoId: todoId })
  }

  translateTodoList(text: string[]) {
    return this.apiService.post('/translate', { text: text, languageCode: "ja" })
  }
}
