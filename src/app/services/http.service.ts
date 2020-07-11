import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserModel} from '../user/assets/user.model';
import {catchError, map} from 'rxjs/operators';
import {RegisterModel} from '../user/register/register.model';
import {SessionService} from './session.service';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private headers: HttpHeaders;
  //private uri = 'http://localhost:8080';
  private uri = 'http://46.101.167.243:8080';
  private params: HttpParams;
  private responseType: string;
  constructor(private http: HttpClient, private session: SessionService, private notification: NotificationService) {
    this.headers = new HttpHeaders();
  }


  login(user: UserModel): Observable<any> {
    return this.post('/users', user).pipe(
      map(token => {
        this.session.createSession(token);
      }), catchError(error => {
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
        return this.handleError(error);
      })
    );
  }

  get(endpoint: string, body?: object): Observable<any> {
    return this.http.get(this.uri + endpoint, this.getOptions());
  }

  put(endpoint: string, body?: object): Observable<any> {
    return this.http.put(this.uri + endpoint, body, this.getOptions()).pipe(
      map(response => {
          console.log(response);
          return this.extractData(response);
        }
      ), catchError(this.handleError)
    );
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(this.uri + endpoint, this.getOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
        }
      )
    );
  }

  getOptions(): any {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
    this.params = new HttpParams();
    this.responseType = 'json';
    if (this.session.getToken()) {
      this.headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization : 'Bearer ' + this.session.getToken()
      });
    }
    return {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
  }

  private extractData(response) {
    return response.body;
  }

  handleError(error) {
    const myerror = error.error.message;
    this.notification.showError(myerror, 'error');
    return throwError(error.message);
  }
}
