import { Component, OnInit } from '@angular/core';
import {ArticleAdminModel} from './assets/article-admin.model';
import {HttpService} from '../../services/http.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateArticleComponent} from './create-article/create-article.component';
import {EditUserComponent} from '../user-crud/edit-user/edit-user.component';
import {EditArticleComponent} from './edit-article/edit-article.component';
import { DomSanitizer } from '@angular/platform-browser';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-crud',
  templateUrl: './article-crud.component.html',
  styleUrls: ['./article-crud.component.css']
})
export class ArticleCrudComponent implements OnInit {

  private permission: Array<string>;
  articles: Array<ArticleAdminModel> = [];

  constructor(private http: HttpService, private dialog: MatDialog, private sanitizer: DomSanitizer, private session: SessionService, private route: Router) {
    this.permission = new Array<string>();
    this.permission.push('ADMIN');
    this.getArticles();
  }

  ngOnInit(): void {
    if (!this.session.checkAuthorization(this.permission)) {
      //this.route.navigate(['/']).then();
    }
  }

  edit(article: ArticleAdminModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = article;
    this.dialog.open(EditArticleComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getArticles();
    });
  }

  create() {
    this.dialog.open(CreateArticleComponent).afterClosed().subscribe(() => {

      this.getArticles();
    });
  }

  delete(id: string) {
    this.http.delete('/article/' + id).subscribe( response => {
      console.log('dummy: ' + response);
      this.getArticles();
    });
  }

  getArticles() {
    this.http.get('/article').subscribe((response) => {
        console.log(response);
        this.articles = response.body;
        this.articles.map(article => {
          article.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + article.file);
        });
        console.log(this.articles);
      }
    );
  }
}
