import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoComponent implements OnInit {
  constructor(
    private userService: UserService
  ) { }

  rippleColor: string = "rgba(96,125,139, 0.2)"
  currentUser: User;
  ngOnInit() {

  }
}
