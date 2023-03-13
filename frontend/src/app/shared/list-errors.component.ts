import { Component, Input } from '@angular/core';

import { Errors } from '../core';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    if (errorList.error instanceof Array) {
      for (const i in errorList.error) {
        this.formattedErrors.push(errorList.error[i]);
      }
    } else {
      this.formattedErrors = Object.keys(errorList.error || {})
        .map(key => `${errorList.error[key]}`);
    }
  }

  get errorList() { return this.formattedErrors; }


}
