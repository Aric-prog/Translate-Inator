import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowAuthedDirective } from './show-authed.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListErrorsComponent } from './list-errors.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ShowAuthedDirective,
    ListErrorsComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ShowAuthedDirective,
    ListErrorsComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
