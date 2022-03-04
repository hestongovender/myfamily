import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyWealthComponent } from './family-wealth.component';
import { AuthGuard } from 'src/app/_helpers';

const routes: Routes = [
  {
    path: 'familywealth',
    canActivate: [AuthGuard],
    component: FamilyWealthComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyWealthRoutingModule { }
