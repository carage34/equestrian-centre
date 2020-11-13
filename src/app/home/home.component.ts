import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService, UserDetails } from '../auth/auth.service';
import { UserData } from '../auth/user-data.model';
import { Subscription } from 'rxjs';
import { CourseData } from '../course-data.model';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: UserDetails;
  isAuth: boolean;
  courses: CourseData[];

  constructor(private http: HttpClient, private authService: AuthService, public courseService: CourseService, public router: Router) { }

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

  editCourse(id: number) {
    this.router.navigateByUrl('edit-course/'+id);
  }
}
