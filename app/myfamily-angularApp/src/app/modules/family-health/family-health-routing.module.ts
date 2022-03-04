import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyHealthComponent } from './family-health.component';
import { AuthGuard } from 'src/app/_helpers';

const routes: Routes = [
  {
    path: 'familyhealth',
    canActivate: [AuthGuard],
    component: FamilyHealthComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyHealthRoutingModule { }
