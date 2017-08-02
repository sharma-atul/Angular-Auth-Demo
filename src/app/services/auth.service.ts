import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) {
   return this.http.post('/api/authenticate',
      JSON.stringify(credentials))
      .map(response =>{
        let result = response.json();
        //if there was a response and it has a token in it
        // it was successful.
        if(response && result.token){
            //set local storage
          localStorage.setItem('token',result.token);
          return true;
        }
        return false;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let jwtHelp = new JwtHelper();
    let token = localStorage.getItem('token');

    if(!token){
      return false;
    }
    return !jwtHelp.isTokenExpired(token);
  }

  //returns the whole payload decoded.
  get currentUser(){
    let token = localStorage.getItem('token');
    if(!token) return null;

    return new JwtHelper().decodeToken(token);
  }
}
