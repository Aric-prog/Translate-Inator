import { ModuleWithProviders, NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
  ]
})

export class HomeModule { }
