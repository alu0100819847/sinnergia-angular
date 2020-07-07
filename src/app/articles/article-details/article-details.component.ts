import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ArticleModel} from '../article.model';
import {CartshopService} from '../../services/cartshop.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  article: ArticleModel;
  constructor(@Inject(MAT_DIALOG_DATA) data, private cart: CartshopService, private dialog: MatDialog) {
    this.article = data;
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.cart.addItem({id: this.article.id, amount: 1, name: this.article.name});
    this.dialog.closeAll();
  }

}
