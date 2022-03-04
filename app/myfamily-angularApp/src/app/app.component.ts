import { Component, Input } from '@angular/core';
import { ProfileModel } from './models/profile-model';
import { Router } from '@angular/router';

import { AuthenticationService } from './services';


import { init as initApm } from '@elastic/apm-rum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'My Family';
  opened = true;
  currentUser: ProfileModel;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  apm = initApm({
    // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
    serviceName: 'myfamily-apm',

    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: 'http://localhost:8200',

    // Set service version (required for sourcemap feature)
    serviceVersion: '0'
  });

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
