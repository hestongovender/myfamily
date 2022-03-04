import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { PersonalProfileComponent } from './components/personal-profile/personal-profile.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileFormComponent,
    PersonalProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProfileFormComponent,
    PersonalProfileComponent
  ],
  entryComponents: [ProfileFormComponent]
})
export class ProfileModule { }
