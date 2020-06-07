import { Component, OnInit } from '@angular/core';
import { ArticleModel } from './article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor() { }
  articles: Array<ArticleModel> = [];
  ngOnInit(): void {
    this.articles.push({image: '../../assets/img/hoja.png',
    name: 'Hoja Inservible',
    price: 60}
    );
    this.articles.push({image: '../../assets/img/hojaV.png',
      name: 'Hoja Inservible',
      price: 60}
    );
    this.articles.push({image: '../../assets/img/dum.jpg',
      name: 'Fondo descartado tras estudio de la interfaz al comienzo del proyecto',
      price: 60}
    );

  }

}
