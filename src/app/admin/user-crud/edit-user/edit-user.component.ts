import {Component, Inject, OnInit} from '@angular/core';
import {UserAdminModel} from '../assets/user-admin.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: UserAdminModel;

  constructor(@Inject(MAT_DIALOG_DATA) data, private http: HttpService, private dialog: MatDialog) {
    this.user = data;
  }


  ngOnInit(): void {
  }

  edit() {
    this.http.put('/users', this.user).subscribe( (response) => {
        console.log('dummy: ' + response);
      this.dialog.closeAll();
    });
  }
}
