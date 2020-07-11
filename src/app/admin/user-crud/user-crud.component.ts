import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { UserAdminModel } from './assets/user-admin.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditUserComponent} from './edit-user/edit-user.component';


@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {

  users: Array<UserAdminModel> = [];

  constructor(private http: HttpService, private dialog: MatDialog) {
    this.getUsers();
    console.log(this.users);
  }

  ngOnInit(): void {
  }

  edit(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;
    this.dialog.open(EditUserComponent, dialogConfig).afterClosed().subscribe(() =>
      this.getUsers()
    );
    console.log(user);
  }

  delete(email: string) {
    console.log(email);
    this.http.delete('/users/' + email).subscribe( response => {
      console.log('dummy: ' + response);
    });
    this.getUsers();
  }

  getUsers() {
    this.http.get('/users').subscribe( (response) => {
        this.users = response.body;
      }
    );
  }
}
