import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyCalendarComponent } from './family-calendar.component';
import { AuthGuard } from 'src/app/_helpers';

const routes: Routes = [
  {
    path: 'familycalendar',
    canActivate: [AuthGuard],
    component: FamilyCalendarComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyCalendarRoutingModule { }
