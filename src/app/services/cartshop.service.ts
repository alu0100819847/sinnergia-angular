import {EventEmitter, Injectable, Output} from '@angular/core';
import {CartshopModel} from './cartshop.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartshopService {

  cartshop: Array<CartshopModel> = [];

  @Output() articleAdded: EventEmitter<boolean> = new EventEmitter();

  constructor(private cookies: CookieService) {
    this.checkCart();
  }

  checkCart(): void {
    this.cartshop = JSON.parse(localStorage.getItem('cart'));
    if (this.cartshop == null) {
      this.cartshop = [];
    }
  }

  addItem(item: CartshopModel) {
    this.checkCart();
    console.log(this.cartshop);
    const articleInCar = this.cartshop.find(elem => elem.id === item.id);
    if (articleInCar) {
      this.cartshop.find(elem => elem.id === item.id).amount = articleInCar.amount + 1;
    } else {
      this.cartshop.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(this.cartshop));
    this.articleAdded.emit();
  }

  getAllItems() {
    this.checkCart();
    return this.cartshop;
  }

  deleteItem(item: CartshopModel){
    this.checkCart();
    console.log(this.cartshop);
    const articleInCar = this.cartshop.find(elem => elem.id === item.id);
    const index = this.cartshop.indexOf(articleInCar);
    console.log(index);
    this.cartshop.splice(index, 1);
    console.log(this.cartshop);
    localStorage.setItem('cart', JSON.stringify(this.cartshop));
  }
}
