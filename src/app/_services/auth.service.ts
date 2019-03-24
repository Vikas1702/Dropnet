import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {RequestOptions } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  viewData: any;
  // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + tapplication/x-www-form-urlencoded);
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
            // remove this
            this.viewData = this.decodedToken;
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

  getUserProfile() {
    const token = localStorage.getItem('token');
    // const headersObject = new HttpHeaders();
    // headersObject.append('Content-Type', 'application/x-www-form-urlencoded');
    // headersObject.append('Authorization', token);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(this.baseUrl + 'GetUserProfiles', httpOptions).pipe(
      map((response: any) => {
        console.log(response);
      })
    );
  }
}
