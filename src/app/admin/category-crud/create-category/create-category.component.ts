import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {HttpService} from '../../../services/http.service';
import {CategoriesModel} from '../models/categories.model';
import {CategoryService} from '../../../services/category.service';
import {CategoryCreateModel} from '../models/category-create.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  uploadForm: FormGroup;
  categories: Array<CategoriesModel>;

  constructor(private http: HttpService, private formBuilder: FormBuilder, private dialog: MatDialog, private categoryService: CategoryService) {
    console.log(this.categories);
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      name: '',
      categoryFamilyId: ''
    });
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.body;
    });

  }

  create() {
    const category: CategoryCreateModel = {categoryFamilyId: null, name: null};

    if (this.uploadForm.get('categoryFamilyId').value !== ''){
      category.categoryFamilyId = this.uploadForm.get('categoryFamilyId').value;
    }

    category.name = this.uploadForm.get('name').value;
    console.log(category);
    this.http.post('/category', category).subscribe( response => {
      console.log('dummy');
      console.log('dummy' + response);
      this.dialog.closeAll();
      console.log('dummy' + response);
    });


  }
}
