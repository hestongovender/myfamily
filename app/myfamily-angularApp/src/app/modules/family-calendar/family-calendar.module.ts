import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyCalendarRoutingModule } from './family-calendar-routing.module';
import { FamilyCalendarComponent } from './family-calendar.component';


@NgModule({
  declarations: [FamilyCalendarComponent],
  imports: [
    CommonModule,
    FamilyCalendarRoutingModule
  ]
})
export class FamilyCalendarModule { }
