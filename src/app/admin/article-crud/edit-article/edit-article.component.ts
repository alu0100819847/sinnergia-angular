import {Component, Inject, OnInit} from '@angular/core';
import {ArticleAdminModel} from '../assets/article-admin.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  article: ArticleAdminModel;

  constructor(@Inject(MAT_DIALOG_DATA) data, private http: HttpService) {
    this.article = data;
  }

  ngOnInit(): void {
  }

  edit() {
    this.http.put('/article', this.article).subscribe( (response) => {
      console.log('dummy: ' + response);
    });
  }
}
