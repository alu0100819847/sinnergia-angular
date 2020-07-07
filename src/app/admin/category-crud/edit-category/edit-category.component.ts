import {Component, Inject, OnInit} from '@angular/core';
import {CategoryCreateModel} from '../models/category-create.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpService} from '../../../services/http.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {CategoryEditModel} from './category-edit.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  uploadForm: FormGroup;
  category: CategoryEditModel = {id: null, name: null};
  constructor(@Inject(MAT_DIALOG_DATA) data, private http: HttpService, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.category.id = data.id;
    this.category.name = data.name;
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      id: this.category.id,
      name: this.category.name,
    });
  }

  edit() {
    this.category.id = this.uploadForm.get('id').value;
    this.category.name = this.uploadForm.get('name').value;
    console.log(this.category);
    this.http.put('/category', this.category).subscribe( response => {
      console.log('dummy');
      console.log('dummy' + response);
      this.dialog.closeAll();
      console.log('dummy' + response);
    });
  }
}
