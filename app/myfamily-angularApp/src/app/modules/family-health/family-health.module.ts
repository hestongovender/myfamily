import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyHealthRoutingModule } from './family-health-routing.module';
import { FamilyHealthComponent } from './family-health.component';
import { FamilyWealthComponent } from '../family-wealth/family-wealth.component';


@NgModule({
  declarations: [FamilyHealthComponent, FamilyWealthComponent],
  imports: [
    CommonModule,
    FamilyHealthRoutingModule
  ]
})
export class FamilyHealthModule { }
