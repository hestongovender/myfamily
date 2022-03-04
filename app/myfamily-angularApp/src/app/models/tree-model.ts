import { ProfileModel } from './profile-model';

export class TreeModel {
    personalDetails: ProfileModel;
    parents: ProfileModel[];
    siblings: ProfileModel[];
    spouse: ProfileModel[];
    children: ProfileModel[];
}
