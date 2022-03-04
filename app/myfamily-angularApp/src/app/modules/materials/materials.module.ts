import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatButtonModule,
    Material.MatCardModule,
    Material.MatDialogModule,
    Material.MatFormFieldModule,
    Material.MatGridListModule,
    Material.MatIconModule,
    Material.MatInputModule,
    Material.MatListModule,
    Material.MatMenuModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatSidenavModule,
    Material.MatStepperModule,
    Material.MatToolbarModule,
    Material.MatTooltipModule
  ],
  exports: [
    Material.MatButtonModule,
    Material.MatCardModule,
    Material.MatDialogModule,
    Material.MatFormFieldModule,
    Material.MatGridListModule,
    Material.MatIconModule,
    Material.MatInputModule,
    Material.MatListModule,
    Material.MatMenuModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatSidenavModule,
    Material.MatStepperModule,
    Material.MatToolbarModule,
    Material.MatTooltipModule
  ]
})
export class MaterialsModule { }
