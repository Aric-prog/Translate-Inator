import { Component } from '@angular/core';
import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.populate();
  }
}
