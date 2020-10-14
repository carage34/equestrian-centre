import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { UserData } from "./user-data.model";
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private firstName: string;
  private lastname: string;
  private email: string;
  private role: string

  constructor(private http: HttpClient) { }

  isAuth() {
    return this.isAuthenticated;
  }

  createUser(firstname: string, lastname: string, email: string, password: string, licence: string) {
    let newLicence = null;
    if(licence) newLicence = licence;
    const signUpData: UserData = {firstname: firstname, lastname: lastname, email: email, password: password, licence: newLicence };
    return this.http
      .post("http://localhost:8080/api/user", signUpData, {withCredentials: true});
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    return this.http
    .post("http://localhost:8080/api/user/login", authData, {withCredentials: true});
  }

  saveUser(userData: UserData) {

  }

}
