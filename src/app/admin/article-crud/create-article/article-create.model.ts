import {FamilyAdminModel} from '../../category-crud/models/family-admin.model';

export interface ArticleCreateModel {
  name: string;
  price: number;
  stock: number;
  description: string;
  file: any[];
  category: FamilyAdminModel;
}
