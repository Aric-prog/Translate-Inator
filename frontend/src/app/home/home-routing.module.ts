import { inject, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { UserService } from '../core';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      isAuthenticated: (router: Router) => inject(UserService).isAuthenticated.pipe(take(1))
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
