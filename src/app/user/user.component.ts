import { Component, OnInit } from '@angular/core';
import {UserModel} from './assets/user.model';
import {RegisterComponent} from './register/register.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserModel = { email: null, password: ''};

  constructor(private dialog: MatDialog, private http: HttpService) { }

  ngOnInit(): void {
  }

  login() {
    console.log('user');
    this.http.login(this.user).subscribe(() =>
     this.dialog.closeAll()
    );
  }

  openRegister() {
    this.dialog.open(RegisterComponent);
  }
}
