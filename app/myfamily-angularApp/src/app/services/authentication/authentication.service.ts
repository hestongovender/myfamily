import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyFamilyApiService } from '../my-family-api/my-family-api.service';
import { LoginModel } from 'src/app/models/login-model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private loginCredentials: LoginModel;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private myFamilyApiService: MyFamilyApiService) {
    this.loginCredentials = new LoginModel();
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    this.loginCredentials.username = username;
    this.loginCredentials.password = password;
    return this.myFamilyApiService.authenticateLogin(this.loginCredentials)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
