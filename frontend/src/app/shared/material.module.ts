import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule, MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
const globalRippleConfig: RippleGlobalOptions = {
  animation: {
    enterDuration: 300,
    exitDuration: 0
  }
};

const modules = [
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatGridListModule,
  MatProgressBarModule,
  MatDividerModule,
  MatListModule,
  MatRippleModule,
  MatIconModule
]

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [{ provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig }]
})
export class MaterialModule { }
