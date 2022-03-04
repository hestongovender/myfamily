import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileModel } from 'src/app/models/profile-model';
import { LoginModel } from 'src/app/models/login-model';

@Injectable({
  providedIn: 'root'
})
export class MyFamilyApiService {
  TREEAPI_URL = 'https://localhost:5001/api';

  constructor(private httpClient: HttpClient) {
  }

  //#region user
  public addLogin(loginCredentials: LoginModel) {
    return this.httpClient.post(`${this.TREEAPI_URL}/user/register/`, loginCredentials);
  }

  public authenticateLogin(loginCredentials: LoginModel) {
    return this.httpClient.post(`${this.TREEAPI_URL}/user/login/`, loginCredentials);
  }
  //#endregion user

  //#region profile
  public addPersonalProfile(profileData: any) {
    return this.httpClient.post(`${this.TREEAPI_URL}/profile`, profileData);
  }

  public getPersonalProfile(id: number) {
    return this.httpClient.get(`${this.TREEAPI_URL}/profile/${id}`);
  }

  public getPersonalProfilebyIdentityNumber(identityNumber: number) {
    return this.httpClient.get(`${this.TREEAPI_URL}/profile/identityNumber/${identityNumber}`);
  }

  public updatePersonalProfile(profileData: ProfileModel) {
    return this.httpClient.put(`${this.TREEAPI_URL}/profile/${profileData.id}`, profileData);
  }

  public deletePersonalProfile(id: number) {
    return this.httpClient.delete(`${this.TREEAPI_URL}/profile/${id}`);
  }
  //#endregion profile

  //#region relative
  public addRelative(userId: number, relation: string, profileData: any) {
    return this.httpClient.post(`${this.TREEAPI_URL}/profile/${userId}/relative/${relation}`, profileData);
  }

  public getRelative(userId: number, relation: string) {
    return this.httpClient.get(`${this.TREEAPI_URL}/profile/${userId}/relative/${relation}`);
  }

  // public updateRelative(userId: number, profileData: ProfileModel) {
  //   return this.httpClient.put(`${this.TREEAPI_URL}/profile/${userId}/relative/${profileData.id}`, profileData);
  // }

  public deleteRelative(userId: number, relativeId: number) {
    return this.httpClient.delete(`${this.TREEAPI_URL}/profile/${userId}/relative/${relativeId}`);
  }
  //#endregion relative

  //#region tree
  public getFamilyTree(id: number) {
    return this.httpClient.get(`${this.TREEAPI_URL}/tree/${id}`);
  }
  //#endregion tree
}
