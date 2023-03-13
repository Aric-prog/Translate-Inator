import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Router } from '@angular/router';

import { TodoService, User, UserService } from '../core';
import { Todo } from '../core/models/todo.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private todoService: TodoService
  ) { }

  isAuthenticated: boolean;
  isTranslating: boolean = false;
  rippleColor: string = "rgba(96,125,139, 0.1)"
  currentUser: User;
  todos: Todo[];
  translatedTodos: string[] = [];

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if (!authenticated) {
          this.router.navigateByUrl('/login');
        }

        this.todoService.getTodoList().subscribe({
          next: (data: Todo[]) => this.todos = data,
          error: (err: Error) => console.log("Failed to retrieve data")
        })
      }
    );
  }

  insertNote(body: string) {
    this.todoService.insertTodo(body).subscribe({
      next: (todo: Todo) => {
        this.todos.push(todo);
      },
      error: (err: Error) => console.log(err)
    })
  }

  deleteSelectedNote(selected: Iterable<MatListOption>) {
    const todoId: string[] = [];
    for (const i of selected) {
      todoId.push(i.value[0])
      i._elementRef.nativeElement.remove()
    }

    this.todoService.deleteTodoList(todoId).subscribe({
      next: (data) => {
      }
    })
  }

  translateSelectedNote(selected: Iterable<MatListOption>) {
    const inputText: string[] = [];
    for (const i of selected) {
      inputText.push(i.value[1])
    }
    this.isTranslating = true;
    this.todoService.translateTodoList(inputText).subscribe({
      next: (todo) => {
        this.isTranslating = false;
        this.translatedTodos = todo.translation;
      },
      error: (err: Error) => console.log(err)
    });
  }
}
