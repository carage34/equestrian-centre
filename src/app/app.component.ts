import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { UserData } from './auth/user-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'equestrian-centre';

  constructor(public authService: AuthService) { }

  isAuth: boolean;
  subscription: Subscription;
  
  ngOnInit(): void {
    this.subscription = this.authService
    .getIsAuth()
    .subscribe(isAuth => {
      this.isAuth = isAuth;
    })
    this.isAuth = this.authService.isAuth();
  }
}
