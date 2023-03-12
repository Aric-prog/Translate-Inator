import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
  ]
})

export class AuthModule { }
