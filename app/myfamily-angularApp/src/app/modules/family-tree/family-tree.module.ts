import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialsModule } from '../materials/materials.module';
import { ProfileModule } from '../profile/profile.module';

import { FamilyTreeRoutingModule } from './family-tree-routing.module';
import { FamilyTreeComponent } from './family-tree.component';
import { FamilyTreeGraphComponent } from './components/family-tree-graph/family-tree-graph.component';


@NgModule({
  declarations: [
    FamilyTreeComponent,
    FamilyTreeGraphComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialsModule,
    ProfileModule,
    FamilyTreeRoutingModule,
  ]
})
export class FamilyTreeModule { }
