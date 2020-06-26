import {Component, Inject, OnInit} from '@angular/core';
import {ArticleAdminModel} from '../assets/article-admin.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {HttpService} from '../../../services/http.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  article: ArticleAdminModel;
  uploadForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) data, private http: HttpService, private dialog: MatDialog, private formBuilder: FormBuilder) {
    this.article = data;
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      id: this.article.id,
      name:  this.article.name,
      price:  this.article.price,
      stock:  this.article.stock,
      description:  this.article.description,
      file: null
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
    console.log();
    if (this.uploadForm.get('file').value) {
      formData.append('file', this.uploadForm.get('file').value);
    }

    this.http.put('/article', formData).subscribe( (response) => {
      this.dialog.closeAll();
      console.log('dummy: ' + response);
    });
  }

}
