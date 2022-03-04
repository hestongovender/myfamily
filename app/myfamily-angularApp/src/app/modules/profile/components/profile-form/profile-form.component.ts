import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProfileModel } from '../../../../models/profile-model';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MyFamilyApiService } from 'src/app/services';

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  @Input() formMode = 'Add Relative';
  @Input() formTitle = 'Profile Information';
  @Input() userId: number;
  @Input() relationData;
  @Input() profileData: ProfileModel;

  @Output() profileFormSubmittedEvent = new EventEmitter();

  profileForm: FormGroup;

  constructor(private fb: FormBuilder,
              private myFamilyApiService: MyFamilyApiService,
              public dialogRef: MatDialogRef<ProfileFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.profileData = new ProfileModel();
  }

  ngOnInit() {
    this.formMode = this.data.formMode;
    this.userId = this.data.userId;
    this.relationData = this.data.relationship;
    this.profileData = this.data.profileData ? this.data.profileData  : null;
    this.profileForm = this.createForm(this.relationData, this.profileData);
  }


  // constructor(private fb: FormBuilder, private myFamilyApiService: FamilyTreeApiService) {
  //   this.profileData = new ProfileModel();
  // }

  // ngOnInit() {
  //   this.profileForm = this.createForm(this.profileData);
  // }

  createForm(relationData: any, profileData: any): FormGroup {
    return this.fb.group({
      relationship: [relationData ? relationData : null],
      id: [profileData ? profileData.id : null],
      firstname: [profileData ? profileData.firstname : null, Validators.required],
      surname: [profileData ? profileData.surname : null, Validators.required],
      maidenName: [profileData ? profileData.maidenName : null],
      identityNumber: [profileData ? profileData.identityNumber : null, Validators.required],
      gender: [profileData ? profileData.gender : 'male', Validators.required],
      emailAddress: [profileData ? profileData.emailAddress : null, Validators.compose([Validators.required, Validators.email])],
      cellphoneNumber: [profileData ? profileData.cellphoneNumber : null, Validators.required],
      homeNumber: [profileData ? profileData.homeNumber : null],
      workNumber: [profileData ? profileData.workNumber : null]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      switch (this.formMode) {
        case 'Add Relative': {
          this.relationData = _.pick(this.profileForm.value, 'relationship');
          let newRelativeData = _.pick(this.profileForm.value, [
            'firstname',
            'surname',
            'maidenName',
            'identityNumber',
            'gender',
            'emailAddress',
            'cellphoneNumber',
            'homeNumber',
            'workNumber']);
          this.myFamilyApiService.addRelative(this.userId, this.relationData.relationship, newRelativeData).subscribe((data) => {
            this.profileData = data as ProfileModel;
            console.log('ProfileForm submitted with ', this.profileData);
            this.profileFormSubmittedEvent.emit(this.profileData);
            this.onClose();
          });
          break;
        }
        case 'Update Profile': {
          this.profileData = _.pick(this.profileForm.value, [
            'id',
            'firstname',
            'surname',
            'maidenName',
            'identityNumber',
            'gender',
            'emailAddress',
            'cellphoneNumber',
            'homeNumber',
            'workNumber']);
          this.myFamilyApiService.updatePersonalProfile(this.profileData).subscribe((data) => {
            this.profileData = data as ProfileModel;
            console.log('ProfileForm submitted with ', this.profileData);
            this.profileFormSubmittedEvent.emit(this.profileData);
            this.onClose();
          });
          break;
        }
      }
    }
  }

  onClose() {
    this.dialogRef.close(this.profileData);
  }
}
