import { Injectable } from '@angular/core';
import {CategoryAdminModel} from '../admin/category-crud/models/category-admin.model';
import {HttpService} from './http.service';
import {CategoriesModel} from '../admin/category-crud/models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Array<CategoriesModel>;

  constructor(private http: HttpService) {
    this.setCategories();
  }

  setCategories() {
    return this.http.get('/category');
  }

  getCategories() {
    return this.setCategories();
  }
}
