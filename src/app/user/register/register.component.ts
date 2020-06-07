import { Component, OnInit } from '@angular/core';
import {RegisterModel} from './register.model';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpService) { }
  user: RegisterModel = { email: null, password: null, repeatedPassword: null};
  ngOnInit(): void {
  }

  register() {
    this.http.register(this.user).subscribe( (a) =>
      console.log('dummy: ' + a)
    );
  }


}
