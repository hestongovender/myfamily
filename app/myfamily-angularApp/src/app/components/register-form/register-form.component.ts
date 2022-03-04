import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginModel } from 'src/app/models/login-model';
import { ProfileModel } from 'src/app/models/profile-model';
import { AuthenticationService, MyFamilyApiService } from 'src/app/services';

import * as _ from 'lodash';
import { first } from 'rxjs/operators';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  profileForm: FormGroup;
  loginForm: FormGroup;

  profileData: ProfileModel;
  loginData: LoginModel;

  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private myFamilyApiService: MyFamilyApiService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }

    this.profileData = new ProfileModel();
    this.loginData = new LoginModel();
  }

  ngOnInit() {
    this.profileForm = this.createProfileForm();
    this.loginForm = this.createLoginForm();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || '/';
  }

  createProfileForm(): FormGroup {
    return this.fb.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      maidenName: [''],
      identityNumber: ['', Validators.required],
      gender: ['male', Validators.required],
      emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
      cellphoneNumber: ['', Validators.required],
      homeNumber: [''],
      workNumber: [''],
    });
  }

  // convenience getter for easy access to form fields
  onSubmitProfile() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    // let profileExists = false;
    this.loading = true;
    let newProfileData = _.pick(this.profileForm.value, [
      'firstname',
      'surname',
      'maidenName',
      'identityNumber',
      'gender',
      'emailAddress',
      'cellphoneNumber',
      'homeNumber',
      'workNumber']);
    // check for existing personal profile
    this.myFamilyApiService.getPersonalProfilebyIdentityNumber(newProfileData.identityNumber)
      .subscribe(
        existingProfile => {
          if (existingProfile != null) {
            this.profileData = existingProfile as ProfileModel;
            this.loading = false;
            // TODO: update the existing profile with the newProfileData
            // this.myFamilyApiService.updatePersonalProfile(newProfileData)
          } else {
            this.myFamilyApiService.addPersonalProfile(newProfileData)
            .pipe(first())
            .subscribe(
              newProfile => {
                this.profileData = newProfile as ProfileModel;
                this.loading = false;
              },
              error => {
                this.error = error;
                this.loading = false;
              });
          }
        }
      );
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      displayName: [''],
      password: ['', Validators.required],
      // confirmPassword: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get flogin() { return this.loginForm.controls; }

  onSubmitLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.loginData.profileId = this.profileData.id;
    this.loginData.username = this.flogin.username.value;
    this.loginData.password = this.flogin.password.value;
    this.myFamilyApiService.addLogin(this.loginData)
      .pipe(first())
      .subscribe(
        data => {
          this.profileData = data as ProfileModel;
          this.loading = false;
          this.login();
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  login() {
    this.authenticationService.login(this.flogin.username.value, this.flogin.password.value)
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
