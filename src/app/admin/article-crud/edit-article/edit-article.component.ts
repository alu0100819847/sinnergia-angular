import {Component, Inject, OnInit} from '@angular/core';
import {ArticleAdminModel} from '../assets/article-admin.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {HttpService} from '../../../services/http.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoryAdminModel} from '../../category-crud/models/category-admin.model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  article: ArticleAdminModel;
  uploadForm: FormGroup;
  categories: Array<CategoryAdminModel>;

  constructor(@Inject(MAT_DIALOG_DATA) data, private http: HttpService, private dialog: MatDialog, private formBuilder: FormBuilder) {
    this.article = data;
    if (this.article.category == null) {
      this.article.category = {id: '', name: null};
    }
  }

  ngOnInit(): void {
    this.getCategories();
    this.uploadForm = this.formBuilder.group({
      id: this.article.id,
      name:  this.article.name,
      price:  this.article.price,
      stock:  this.article.stock,
      description:  this.article.description,
      file: null,
      categoryId: this.article.category.id,
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }

  edit() {
    const formData = new FormData();
    formData.append('id', this.uploadForm.get('id').value);
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('price', this.uploadForm.get('price').value);
    formData.append('stock', this.uploadForm.get('stock').value);
    formData.append('description', this.uploadForm.get('description').value);
    formData.append('categoryId', this.uploadForm.get('categoryId').value);
    console.log();
    if (this.uploadForm.get('file').value) {
      formData.append('file', this.uploadForm.get('file').value);
    }

    this.http.put('/article', formData).subscribe( (response) => {
      this.dialog.closeAll();
      console.log('dummy: ' + response);
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
          });
          console.log(category);
        });
        console.log(this.categories);
      }
    );
  }
}
