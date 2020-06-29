import {FamilyAdminModel} from './family-admin.model';

export interface CategoryAdminModel {
  id: string;
  name: string;
  family: FamilyAdminModel;

}
