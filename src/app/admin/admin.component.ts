import { Component, OnInit } from '@angular/core';
import {SessionService} from '../services/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private permission: Array<string>;

  constructor(private session: SessionService, private route: Router) {
    this.permission = new Array<string>();
    this.permission.push('ADMIN');
  }

  ngOnInit(): void {
    if (!this.session.checkAuthorization(this.permission)) {
      this.route.navigate(['/']).then();
    }
  }

}
