import { Component, OnInit } from '@angular/core';
import {UserModel} from './assets/user.model';
import {RegisterComponent} from './register/register.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpService} from '../services/http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserModel = { email: null, password: ''};

  uploadForm: FormGroup;



  constructor(private dialog: MatDialog, private http: HttpService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-][a-z0-9._%+-][a-z0-9._%+-][a-z0-9._%+-][a-z0-9._%+-][a-z0-9._%+-]+')
      ])
    });
  }

  login() {
    this.user.email = this.uploadForm.get('email').value;
    this.user.password = this.uploadForm.get('password').value;
    this.http.login(this.user).subscribe(() =>
     this.dialog.closeAll()
    );
  }

  openRegister() {
    this.dialog.open(RegisterComponent);
  }

  emailIsNotValid() {
    return this.uploadForm.get('email').invalid && this.uploadForm.get('email').touched;
  }

  passwordIsNotValid() {
    return this.uploadForm.get('password').invalid && this.uploadForm.get('password').touched;
  }
}
