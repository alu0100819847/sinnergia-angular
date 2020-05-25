import {Injectable} from '@angular/core';
import {TokenModel} from './token.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class SessionService {

  private token: TokenModel = {token: null, email: null, roles: null};
  constructor() {
  }

  createSession(token: any) {
    this.token.token = token.token;
    this.token.email = new JwtHelperService().decodeToken(token.token).user;
    this.token.roles = new JwtHelperService().decodeToken(token.token).roles;
  }

  isLoged(): boolean {
    return this.token.token != null;

  }

  logout() {
    this.token = {token: null, email: null, roles: null};
  }

  getToken(): string {
    return this.token.token;
  }

}
