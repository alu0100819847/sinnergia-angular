import { Component, OnInit } from '@angular/core';
import { ArticleCreateModel } from './article-create.model';
import {HttpService} from '../../../services/http.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CategoryAdminModel} from '../../category-crud/models/category-admin.model';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  article: ArticleCreateModel = { name: null, price: 0, stock: 0, description: '', file: [], category: {id: null, name: null}};
  uploadForm: FormGroup;
  categories: Array<CategoryAdminModel>;

  constructor(private http: HttpService, private formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories();
    this.uploadForm = this.formBuilder.group({
      name: '',
      price: 0,
      stock: 0,
      description: '',
      file: null,
      categoryId: '',
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }

  create() {
    const formData = new FormData();
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('price', this.uploadForm.get('price').value);
    formData.append('stock', this.uploadForm.get('stock').value);
    formData.append('description', this.uploadForm.get('description').value);
    formData.append('categoryId', this.uploadForm.get('categoryId').value);
    console.log(this.uploadForm.get('categoryId'));

    if (this.uploadForm.get('file').value) {
      formData.append('file', this.uploadForm.get('file').value);
    }
    this.http.post('/article', formData).subscribe( response => {
      console.log('dummy');
      console.log('dummy' + response);
      this.dialog.closeAll();
      console.log('dummy' + response);
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
}
