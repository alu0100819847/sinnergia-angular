import {Injectable} from '@angular/core';
import {TokenModel} from './token.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private token: TokenModel = {token: null, email: null, roles: null};

  constructor(private cookies: CookieService) {
    this.checkToken();
    console.log(this.token);
    console.log(new JwtHelperService().getTokenExpirationDate(this.getToken()));
  }

  createSession(token: any) {
    this.token.token = token.token;
    this.token.email = new JwtHelperService().decodeToken(token.token).user;
    this.token.roles = new JwtHelperService().decodeToken(token.token).roles;
    this.cookies.set('token', token.token);
  }

  isLoged(): boolean {
    this.checkToken();
    return this.cookies.check('token');
  }

  reset() {
    this.cookies.delete('token');
  }

  logout() {
    this.reset();
  }

  isAdmin() {
    this.checkToken();
    return this.getRoles().includes('ADMIN');
  }

  getToken(): string {
    return this.cookies.get('token');
  }

  private getRoles() {
    return new JwtHelperService().decodeToken(this.getToken()).roles;
  }

  tokenExpired() {
    return new Date(new JwtHelperService().getTokenExpirationDate(this.getToken())) < new Date();
  }

  checkToken() {
    if (this.tokenExpired()) { this.reset(); }
  }

  checkAuthorization(authorization: string[]): boolean {
    for (const auth of authorization) {
      if (this.getRoles().includes(auth)) {
        return true;
      }
    }
    return false;
  }
}
