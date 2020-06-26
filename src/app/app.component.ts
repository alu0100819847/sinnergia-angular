import {Component, NgModule, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserComponent} from './user/user.component';
import {SessionService} from './services/session.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'sinnergia-angular';

  constructor(private dialog: MatDialog, private session: SessionService) {

  }



  ngOnInit() {
  }

  isLoged() {
    return this.session.isLoged();
  }

  isAdmin(){
    return this.isLoged() && this.session.isAdmin();
  }

  logout() {
    this.session.logout();
  }
  openLogin() {
    this.dialog.open(UserComponent);
  }
}
