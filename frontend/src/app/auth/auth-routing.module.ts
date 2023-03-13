import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '../core/services/no-auth-guard.service';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [() => inject(NoAuthGuard).canActivate()]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [() => inject(NoAuthGuard).canActivate()]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
