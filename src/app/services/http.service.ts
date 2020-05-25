import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../user/assets/user.model';
import {catchError, map} from 'rxjs/operators';
import {RegisterModel} from '../user/register/register.model';
import {SessionService} from './session.service';
@Injectable()
export class HttpService {
  private headers: HttpHeaders;
  private uri = 'http://localhost:8080';

  private params: HttpParams;
  private responseType: string;
  constructor(private http: HttpClient, private session: SessionService) {
    this.headers = new HttpHeaders();
  }


  login(user: UserModel): Observable<any> {
    return this.post('/users', user).pipe(
      map(token => {
        this.session.createSession(token);
      }), catchError(error => {
        console.log(error);
        return error;
      })
    );
  }

  register(user: RegisterModel): Observable<any> {
    return this.http.post(this.uri + '/users/register', user, this.getOptions());
  }

  post(endpoint: string, body?: object): Observable<any> {
    return this.http.post(this.uri + endpoint, body, this.getOptions()).pipe(
      map(response => {
        console.log(response);
        return this.extractData(response);
        }
      ), catchError(error => {
        console.log(error);
        return error;
      })
    );
  }

  getOptions(): any {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
    this.params = new HttpParams();
    this.responseType = 'json';

    if (this.session.getToken() !== null) {
      this.headers.append('Authorization', 'Bearer ' + this.session.getToken());
    }
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    return options;
  }

  private extractData(response) {
    console.log(response);
    return response.body;
  }
}
