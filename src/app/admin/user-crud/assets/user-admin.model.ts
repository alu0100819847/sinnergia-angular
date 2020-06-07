export interface UserAdminModel {
  id: string;
  email: string;
  name: string;
  surname: string;
  roles: Array<string>;
  registrationDate: Date;

}
