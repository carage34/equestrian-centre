import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllSuperAdmin() {
    return this.http.get("http://localhost:8080/api/user/getSuperAdmin");
  }

  removeAdminAcess(id: number) {
    return this.http.get(environment.API_BASE + "/user/removeAdminAccess/"+id);
  }

  addAdminAcess(id: number) {
    return this.http.get(environment.API_BASE + "/user/addAdminAccess/"+id);
  }

  getUserInfo(id: number) {
    return this.http.get(environment.API_BASE + "/user/profile/"+id);
  } 
}
