import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../core';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: string = '';
  title: string = '';
  errors: Errors = { error: {} };
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(route => {
      // Gets last string of the url
      this.authType = route[route.length - 1].path;
      this.title = (this.authType === 'login') ? 'login' : 'register';
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    })
  }
  submit() {
    const creds = this.authForm.value;
    console.log(creds)
    this.isSubmitting = true;
    this.userService
      .attemptAuth(this.authType, creds)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.userService.setAuth(data);
          this.isSubmitting = false;
        },
        error: (error) => {
          this.errors = error;
        }
      })

  }
}
