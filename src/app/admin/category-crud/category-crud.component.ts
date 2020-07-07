import { Component, OnInit } from '@angular/core';
import {ArticleAdminModel} from '../article-crud/assets/article-admin.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditArticleComponent} from '../article-crud/edit-article/edit-article.component';
import {CreateArticleComponent} from '../article-crud/create-article/create-article.component';
import {CategoryAdminModel} from './models/category-admin.model';
import {HttpService} from '../../services/http.service';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {SubcategoriesModel} from './models/subcategories.model';
import {EditCategoryComponent} from './edit-category/edit-category.component';

@Component({
  selector: 'app-category-crud',
  templateUrl: './category-crud.component.html',
  styleUrls: ['./category-crud.component.css']
})
export class CategoryCrudComponent implements OnInit {

  constructor(private http: HttpService, private dialog: MatDialog) { }

  categories: Array<CategoryAdminModel>;

  ngOnInit(): void {
    this.getCategories();
  }

  edit(category: CategoryAdminModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = category;
    this.dialog.open(EditCategoryComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getCategories();
    });
  }

  create() {

    this.dialog.open(CreateCategoryComponent).afterClosed().subscribe(() => {

      this.getCategories();
    });
  }

  delete(id: string) {
    this.http.delete('/category/' + id).subscribe( response => {
      console.log('dummy: ' + response);
      this.getCategories();
    });
  }

  getCategories() {
    this.http.get('/category').subscribe((response) => {
        console.log(response);
        this.categories = new Array<CategoryAdminModel>();
        response.body.map(category => {
          const newCategory: CategoryAdminModel = {id: category.id, name: category.name, family: null};
          this.categories.push(newCategory);
          category.subcategories.map(subcategory => {
            const newSubcategory: CategoryAdminModel = {id: subcategory.id, name: subcategory.name,
              family: {name: category.name, id: category.id}};
            this.categories.push(newSubcategory);
          })
          console.log(category);
        });
        console.log(this.categories);
      }
    );
  }
  getName(subcategory: SubcategoriesModel){
    if (subcategory) {
      return subcategory.name;
    }
  }
}
