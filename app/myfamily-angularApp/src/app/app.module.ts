// Angular section
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material section
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './modules/materials/materials.module';

// App section
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { ProfileModule } from './modules/profile/profile.module';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

import { FamilyTreeModule } from './modules/family-tree/family-tree.module';
import { FamilyGamesModule } from './modules/family-games/family-games.module';
import { FamilyHealthModule } from './modules/family-health/family-health.module';
import { FamilyWealthModule } from './modules/family-wealth/family-wealth.module';
import { FamilyCalendarModule } from './modules/family-calendar/family-calendar.module';
import { ErrorLogging } from './_helpers/error.logging';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    // Material section
    BrowserAnimationsModule,
    MaterialsModule,

    // App section
    AppRoutingModule,
    HttpClientModule,
    ProfileModule,
    FamilyTreeModule,
    FamilyGamesModule,
    FamilyHealthModule,
    FamilyWealthModule,
    FamilyCalendarModule
  ],
  entryComponents: [HomeComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorLogging},
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
