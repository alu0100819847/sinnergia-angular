import { Component, OnInit } from '@angular/core';
import { ArticleModel } from './article.model';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../services/http.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {EditArticleComponent} from '../admin/article-crud/edit-article/edit-article.component';
import {ArticleDetailsComponent} from './article-details/article-details.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpService, private sanitizer: DomSanitizer,
              private dialog: MatDialog) { }
  articles: Array<ArticleModel> = [];
  search: string;
  ngOnInit(): void {
    this.searchCategory();
  }

  searchCategory() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.search = params.cat;
      if (this.search) {
        this.getArticlesByCategory();
      } else {
        this.getArticles();
      }
    });
  }

  getArticles() {
    this.articles = [];
    this.http.get('/article').subscribe((response) => {
        response.body.map(article => {

          const image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + article.file);
          this.createArticle(article.id, image, article.name, article.price, article.description);
        });
      }
    );
  }

  getArticlesByCategory() {
    this.articles = [];
    this.http.get('/article/' + this.search).subscribe((response) => {
        response.body.map(article => {
          const image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + article.file);
          this.createArticle(article.id, image, article.name, article.price, article.description);
        });
      }
    );
  }

  createArticle(articleId, articleImage, articleName, articlePrice, articleDescription){
    this.articles.push({id: articleId, image: articleImage,
      name: articleName,
      price: articlePrice,
      description: articleDescription}
    );
  }

  details(article: ArticleModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = article;
    this.dialog.open(ArticleDetailsComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getArticles();
    });
  }

}
