import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService, UserDetails } from '../auth/auth.service';
import { UserData } from '../auth/user-data.model';
import { Subscription } from 'rxjs';
import { CourseData } from '../course-data.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: UserDetails;
  isAuth: boolean;
  courses: CourseData[];

  constructor(private http: HttpClient, private authService: AuthService, public courseService: CourseService) { }

  ngOnInit(): void {
    //this.isAuthenticated = this.authService.isAuth();
    this.authService
    .profile()
    .subscribe(
      user => {
        this.user = user;
      }
    )

    let self = this;

    this.courseService.getAll()
    .subscribe((courses: CourseData[]) => {
      this.courses = courses;
    })
  }


}
