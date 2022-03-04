import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyTreeComponent } from './family-tree.component';
import { FamilyTreeGraphComponent } from './components/family-tree-graph/family-tree-graph.component';
import { AuthGuard } from 'src/app/_helpers';

const routes: Routes = [
  {
    path: 'familytree',
    canActivate: [AuthGuard],
    component: FamilyTreeComponent
  },
  {
    path: 'familytreegraph',
    canActivate: [AuthGuard],
    component: FamilyTreeGraphComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyTreeRoutingModule { }
