import {SubcategoriesModel} from './subcategories.model';

export interface CategoriesModel {
  id: string;
  name: string;
  subcategories: Array<SubcategoriesModel>;
}
