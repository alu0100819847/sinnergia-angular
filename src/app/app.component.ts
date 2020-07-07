import {Component, NgModule, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserComponent} from './user/user.component';
import {SessionService} from './services/session.service';
import {CategoriesModel} from './admin/category-crud/models/categories.model';
import {CategoryService} from './services/category.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CartshopService} from './services/cartshop.service';
import {CartshopModel} from './services/cartshop.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'sinnergia-angular';


  categories: Array<CategoriesModel>;

  cartshop: Array<CartshopModel>;

  constructor(private dialog: MatDialog, private session: SessionService,
              private categoryService: CategoryService, private router: Router,
              private cart: CartshopService,
              ) {
    this.cartshop = this.cart.getAllItems();
  }



  ngOnInit() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.body;
      console.log(this.categories);
    });
    console.log(this.categories);
  }

  isLogged() {
    return this.session.isLoged();
  }

  isAdmin() {
    return this.isLogged() && this.session.isAdmin();
  }

  logout() {
    console.log('click');
    this.session.logout();
  }

  openLogin() {
    this.dialog.open(UserComponent);
  }

  search(category: string) {
    this.router.navigate(['/DummyComponent'], {skipLocationChange: true});
    this.router.navigate(
      [],
      {
        queryParams: { cat: category }
      }).then();
  }

  getCartAmount(){
    return this.cartshop.length;
  }

  deleteFromCartShop(item: CartshopModel){
    this.cart.deleteItem(item);
    this.cartshop = this.cart.getAllItems();
  }
}
