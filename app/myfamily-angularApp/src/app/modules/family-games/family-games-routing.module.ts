import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyGamesComponent } from './family-games.component';
import { AuthGuard } from 'src/app/_helpers';

const routes: Routes = [
  {
    path: 'familygames',
    canActivate: [AuthGuard],
    component: FamilyGamesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyGamesRoutingModule { }
