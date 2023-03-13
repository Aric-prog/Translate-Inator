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
      'email': ['', ([Validators.required, Validators.email])],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(route => {
      // Gets last string of the url
      this.authType = route[route.length - 1].path;
      this.title = (this.authType === 'login') ? 'login' : 'register';
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    })
  }
  submit() {
    const creds = this.authForm.value;
    this.isSubmitting = true;
    this.userService
      .attemptAuth(this.authType, creds)
      .subscribe({
        next: (data) => { this.userService.setAuth(data); },
        error: (error) => {
          console.log(error)
          this.errors = error;
          this.isSubmitting = false;
        }
      })

  }
}
