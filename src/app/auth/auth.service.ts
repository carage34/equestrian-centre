import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserData } from "./user-data.model";
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { UpdateData } from '../update-data.model';
import {environment} from "../../environments/environment"

export interface UserDetails {
  id: number
  firstname: string
  lastname: string
  email: string
  licence: string
  telephone:string
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
  isLoggedIn = false;
  isAuthSub = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getIsAuth() : Observable<boolean> {
    return this.isAuthSub.asObservable();
  }

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
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isAuth(): boolean {
    const user = this.getUserDetail()
    if(user) {
      if(user.exp > Date.now() / 1000) {
        this.isLoggedIn = true;
        this.isAuthSub.next(true);
        return true;
      }
    } else {
      this.isLoggedIn = false;
      this.isAuthSub.next(false);
      return false;
    }
  }

  createUser(firstname: string, lastname: string, email: string, telephone:string, password: string, licence: string, realSignUp: boolean, role?: number) : Observable<any> {
    let newLicence = null;
    if(licence) newLicence = licence;
    const signUpData: UserData = {firstname: firstname, lastname: lastname, email: email, telephone: telephone, password: password, licence: newLicence, roleId: role, realSignUp, id: null };
    const post = this.http
      .post("http://localhost:8080/api/user", signUpData, {withCredentials: true});

    const request = post.pipe(
      map((data: TokenResponse) => {
        console.log(data);
        if(data.token) {
          this.saveToken(data.token);
        }
        this.isLoggedIn = true;
        this.isAuthSub.next(true);
        return data;
      })
    )
    return request;
  }

  updateProfile(firstname: string, lastname: string, email: string, telephone:string, licence: string, id: number) {
    let newLicence = null;
    if(licence) newLicence = licence;
    const updateData: UpdateData = {firstname: firstname, lastname: lastname, email: email, telephone: telephone, licence: newLicence, id: id };
    return this.http.post(environment.API_BASE+"/user/update", updateData, {withCredentials: true});
  }

  login(email: string, password: string) : Observable<any> {
    const authData: AuthData = {email: email, password: password};
    const post = this.http
    .post("http://localhost:8080/api/user/login", authData, {withCredentials: true});

    const request = post.pipe(
      map((data: TokenResponse) => {
        console.log("test");
        console.log(data.token);
        if(data.token) {
          this.saveToken(data.token);
        }
        this.isLoggedIn = true;
        this.isAuthSub.next(true);
        
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
    localStorage.removeItem('auth');
    this.isLoggedIn = false;
    this.isAuthSub.next(false);
    this.router.navigate(['/login']);
  }
}
