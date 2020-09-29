import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(firstname: string, lastname: string, email: string, password: string, licence: string) {
    let newLicence = null;
    if(licence) newLicence = licence;
    const user = {firstname: firstname, lastname: lastname, email: email, password: password, licence: newLicence };
    this.http
      .post("http://localhost:8080/api/user", user)
      .subscribe(response => {
        console.log(response);
      });
  }

}
