import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileModel } from '../../../../models/profile-model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { MyFamilyApiService, AuthenticationService } from 'src/app/services';

@Component({
  selector: 'personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.css']
})
export class PersonalProfileComponent implements OnInit {
  @Input() userId: number;
  // @Input() profileId: number;
  @Input() profile: ProfileModel;
  @Input() profileIsEditable: boolean;
  dialogRef;

  @Output() profileUpdatedEvent = new EventEmitter();
  @Output() profileDeletedEvent = new EventEmitter();

  currentUser: ProfileModel;
  rForm: FormGroup;
  post: any;
  name = '';
  description = '';

  constructor(
    private authenticationService: AuthenticationService,
    private myFamilyApiService: MyFamilyApiService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    if (this.authenticationService.currentUserValue) {
      this.currentUser = this.authenticationService.currentUserValue;
    }
    this.profile = new ProfileModel();
    this.rForm = fb.group({
      name: [null, Validators.required],
      description: [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      validate: ''
    });
  }

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }

  ngOnInit() {
    this.profileIsEditable = false;
  }

  updatePersonalProfile() {
    this.myFamilyApiService.updatePersonalProfile(this.profile).subscribe((data) => {
      // console.log(data);
      this.profile = data as ProfileModel;
      this.formSubmitted(this.profile);
    });
  }

  setEditMode(mode: boolean) {
    this.profileIsEditable = mode;
  }

  deleteProfile() {
    this.myFamilyApiService.deletePersonalProfile(this.profile.id).subscribe((data) => {
      // console.log(data);
      this.profileDeletedEvent.emit();
    });
  }

  deleteRelative() {
    this.myFamilyApiService.deleteRelative(this.currentUser.id, this.profile.id).subscribe((data) => {
      // console.log(data);
      this.profileDeletedEvent.emit();
    });
  }

  editProfile(profileData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      formMode: 'Update Profile',
      profileData};
    this.dialogRef = this.dialog.open(ProfileFormComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.profile = result as ProfileModel;
      this.profileUpdatedEvent.emit();
    });
  }

  formSubmitted(result) {
    console.log('The result is ', result);
    this.profile = result as ProfileModel;
    this.setEditMode(false);
  }
}
