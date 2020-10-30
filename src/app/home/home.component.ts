import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService, UserDetails } from '../auth/auth.service';
import { UserData } from '../auth/user-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: UserDetails
  isAuth: boolean

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    //this.isAuthenticated = this.authService.isAuth();
    this.authService
    .profile()
    .subscribe(
      user => {
        this.user = user;
      }
    )
    
  }
}
