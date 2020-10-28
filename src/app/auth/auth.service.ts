import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserData } from "./user-data.model";
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

export interface UserDetails {
  id: number
  firstnname: string
  lastname: string
  email: string
  licence: string
  password: string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string) : void {
    localStorage.setItem('userToken', token)
    this.token = token;
  }

  private getToken (): string {
    if(!this.token) {
      this.token = localStorage.getItem("userToken");
    }
    return this.token;
  }

  public getUserDetail(): UserDetails {
    const token = this.getToken();
    let payload;
    if(token) {
      payload = token.split('.')[1];
      payload = window.atob(payload)
    } else {
      return null;
    }
  }

  public isAuth(): boolean {
    const user = this.getUserDetail()
    if(user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  createUser(firstname: string, lastname: string, email: string, password: string, licence: string) : Observable<any> {
    let newLicence = null;
    if(licence) newLicence = licence;
    const signUpData: UserData = {firstname: firstname, lastname: lastname, email: email, password: password, licence: newLicence };
    const post = this.http
      .post("http://localhost:8080/api/user", signUpData, {withCredentials: true});

    const request = post.pipe(
      map((data: TokenResponse) => {
        if(data.token) {
          this.saveToken(this.token);
        }
        return data;
      })
    )
    return request;
  }

  login(email: string, password: string) : Observable<any> {
    const authData: AuthData = {email: email, password: password};
    const post = this.http
    .post("http://localhost:8080/api/user/login", authData, {withCredentials: true});

    const request = post.pipe(
      map((data: TokenResponse) => {
        if(data.token) {
          this.saveToken(this.token);
        }
        return data;
      })
    )
    return request;
  }
  profile(): Observable<any> {
    return this.http.get("http://localhost:8080/api/user/profile", {
      headers: {Authorization: `${this.getToken()}`}
    });
  }

  public logout(): void {
    this.token = '';
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }
}
