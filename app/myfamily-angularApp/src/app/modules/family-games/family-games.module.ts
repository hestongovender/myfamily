import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyGamesRoutingModule } from './family-games-routing.module';
import { FamilyGamesComponent } from './family-games.component';


@NgModule({
  declarations: [FamilyGamesComponent],
  imports: [
    CommonModule,
    FamilyGamesRoutingModule
  ],
  exports: [FamilyGamesComponent]
})
export class FamilyGamesModule { }
