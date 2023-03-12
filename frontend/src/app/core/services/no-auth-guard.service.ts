import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '..';
import { map, take } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard {
  constructor(
    private userService: UserService
  ) { }

  // Returns true on user not authenticated, vice versa.
  // Only allows unauthenticated users to pass.
  canActivate(): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
  }
}

