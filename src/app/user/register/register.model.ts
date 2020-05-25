import {UserModel} from '../assets/user.model';

export interface RegisterModel extends UserModel {
  repeatedPassword: string;
}
