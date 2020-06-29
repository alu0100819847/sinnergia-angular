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
    /*return this.http.get('/category').subscribe((response) => {
        console.log(response);
        this.categories = response.body;
        console.log(this.categories);
        return this.categories;
      }
    );

     */
  }

  getCategories() {
    console.log(this.categories);
    return this.setCategories();
  }
}
