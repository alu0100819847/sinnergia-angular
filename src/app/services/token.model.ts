import {Role} from './roles.model';

export interface TokenModel {
  token: string;
  email: string;
  roles: Array<Role>;
}
