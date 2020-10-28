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

  isAuthenticated = false;
  private authStatusSub: Subscription;
  private userStatusSub: Subscription;

  constructor(private authService: AuthService) { }

  isAuth: boolean;
  
  ngOnInit(): void {
    this.isAuth = this.authService.isAuth();
  }
}
