import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/home']);
      }
  }

  ngOnInit() {
    this.loginForm = this.createLoginForm();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || '/';
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['peter.parker', Validators.required],
      password: ['Natal123', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data != null) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.error = 'Incorrect login credentials';
            this.loading = false;
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
