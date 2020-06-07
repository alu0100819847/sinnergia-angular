import { Component, OnInit } from '@angular/core';
import { ArticleCreateModel } from './article-create.model';
import {HttpService} from '../../../services/http.service';
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  article: ArticleCreateModel = { name: null, price: 0, stock: 0, description: ""};

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  create() {
    this.http.post('/article', this.article).subscribe( response => {
      console.log(response);
    });
    console.log(this.article);
  }
}
