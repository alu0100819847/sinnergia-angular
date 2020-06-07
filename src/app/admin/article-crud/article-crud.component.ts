import { Component, OnInit } from '@angular/core';
import {ArticleAdminModel} from './assets/article-admin.model';
import {HttpService} from '../../services/http.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateArticleComponent} from './create-article/create-article.component';
import {EditUserComponent} from '../user-crud/edit-user/edit-user.component';
import {EditArticleComponent} from './edit-article/edit-article.component';

@Component({
  selector: 'app-article-crud',
  templateUrl: './article-crud.component.html',
  styleUrls: ['./article-crud.component.css']
})
export class ArticleCrudComponent implements OnInit {

  articles: Array<ArticleAdminModel> = [];

  constructor(private http: HttpService, private dialog: MatDialog) {
    this.http.get('/article').subscribe((response) => {
        console.log(response);
        this.articles = response.body;
      }
    );
    console.log(this.articles);
  }

  ngOnInit(): void {
  }

  edit(article: ArticleAdminModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = article;
    this.dialog.open(EditArticleComponent, dialogConfig);
  }

  create() {
    this.dialog.open(CreateArticleComponent);
  }

  delete(id: string) {
    this.http.delete('/article/' + id).subscribe( response => {
      console.log('dummy: ' + response);
    });
  }
}
