import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  viewData: any;
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };
  baseUrl = 'http://dropnet.in/index.php/api/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
      return this.http.post(this.baseUrl + 'Login/', model, this.options).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token.token);
            console.log(this.decodedToken);
          }
        })
      );
    }


  register(model: any) {
      return this.http.post(this.baseUrl + 'Register/RegisterUser', model, this.options).pipe(
        map((response: any) => {
          console.log(response);
        })
      );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    // return !this.jwtHelper.isTokenExpired(token);
    return !!token;
  }
}
