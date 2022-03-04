import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

import { AuthGuard } from './_helpers';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path:  '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    pathMatch:  'full'
  },
  {
    path: 'familytree',
    redirectTo: 'familytree'
  },
  {
    path: 'familygames',
    redirectTo: 'familygames'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
