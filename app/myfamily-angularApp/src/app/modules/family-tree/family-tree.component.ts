import { Component, OnInit } from '@angular/core';
import { TreeModel } from '../../models/tree-model';
import { ProfileModel } from '../../models/profile-model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProfileFormComponent } from '../profile/components/profile-form/profile-form.component';
import { AuthenticationService, MyFamilyApiService } from 'src/app/services';

@Component({
  selector: 'family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent implements OnInit {
  userId: number;
  profileData: ProfileModel;
  tree: TreeModel;
  showFamilyTreeGraph: boolean;

  showProfileSideNav: boolean;
  dialogRef: any;

  constructor(
    private authenticationService: AuthenticationService,
    private myFamilyApiService: MyFamilyApiService,
    private dialog: MatDialog
  ) {
    this.profileData = this.authenticationService.currentUserValue;
    this.tree = new TreeModel();
  }

  ngOnInit() {
    this.showFamilyTreeGraph = false;
    this.showProfileSideNav = true;

    this.userId = this.profileData.id;
    this.getFamilyTree();
  }

  getFamilyTree() {
    this.myFamilyApiService.getFamilyTree(this.userId).subscribe((data) => {
      console.log(data);
      this.tree = data as TreeModel;
    });
  }

  showProfileDetails(profileData) {
    if (this.profileData.id !== profileData.id) {
      this.showProfileSideNav = true;
    } else {
      this.showProfileSideNav = !this.showProfileSideNav;
    }
    this.profileData = profileData;
  }

  addRelative(relation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      formMode: 'Add Relative',
      userId: this.userId,
      relationship: relation,
      profileData: this.profileData
    };
    this.dialogRef = this.dialog.open(ProfileFormComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.profileData = result as ProfileModel;
      if (this.profileData.id) {
        this.getFamilyTree();
        this.showProfileDetails(this.profileData);
      }
    });
  }

  onDeleteRelative() {
    this.getFamilyTree();
    this.showProfileSideNav = false;
  }
}
