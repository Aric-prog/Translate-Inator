import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ShowAuthedDirective } from './show-authed.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    ShowAuthedDirective
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ShowAuthedDirective
  ]
})
export class SharedModule { }
