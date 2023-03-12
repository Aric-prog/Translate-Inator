import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { TodoComponent } from './todo.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
  ],
  declarations: [
    TodoComponent,
  ]
})

export class TodoModule { }
