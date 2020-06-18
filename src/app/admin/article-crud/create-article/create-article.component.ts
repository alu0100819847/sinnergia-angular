import { Component, OnInit } from '@angular/core';
import { ArticleCreateModel } from './article-create.model';
import {HttpService} from '../../../services/http.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  article: ArticleCreateModel = { name: null, price: 0, stock: 0, description: '', file: []};
  uploadForm: FormGroup;

  constructor(private http: HttpService, private formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      name: '',
      price: 0,
      stock: 0,
      description: '',
      file: null
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
    console.log();
    if (this.uploadForm.get('file').value) {
      formData.append('file', this.uploadForm.get('file').value);
    }
    this.http.post('/article', formData).subscribe( response => {
      this.dialog.closeAll();
      console.log(response);
    });
  }
}
