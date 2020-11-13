import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService, UserDetails } from '../auth/auth.service';
import { UserData } from '../auth/user-data.model';
import { Subscription } from 'rxjs';
import { CourseData } from '../course-data.model';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';
import { DialogData } from '../dialog-data.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { UserCourse } from '../user-course-data.model';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: UserData;
  isAuth: boolean;
  courses: CourseData[];
  public registeredCourse: UserCourse[];
  roleList = environment.ROLE_LIST;

  constructor(private http: HttpClient,
    private authService: AuthService,
    public courseService: CourseService,
    public router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    //this.isAuthenticated = this.authService.isAuth();
    this.authService
      .profile()
      .subscribe(
        user => {
          this.user = user;
          this.getUserRegisteredCourse(this.user.id);
        }
      )

    this.courseService.getAll()
      .subscribe((courses: CourseData[]) => {
        this.courses = courses;
      })

      
  }

  editCourse(id: number) {
    this.router.navigateByUrl('edit-course/' + id);
  }

  addUserToCourse(idCourse: number) {
    this.courseService.addUserToCourse(this.user.id, idCourse)
      .subscribe((data: DialogData) => {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          data
        })
        this.getUserRegisteredCourse(this.user.id);
    })
    
  }

  removeUserToCourse(idCourse: number) {
    this.courseService.removeUserToCourse(this.user.id, idCourse)
      .subscribe((data: DialogData) => {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          data
        })
        this.getUserRegisteredCourse(this.user.id);
    })
  }

  getUserRegisteredCourse(idUser: number) {
    this.courseService.isUserRegistered(idUser)
      .subscribe((data: UserCourse[]) => {
        this.registeredCourse = data;
        console.log("stp");
        console.log(this.registeredCourse);
    })
  }

  isRegisteredToCourse(idCourse:number) {
    let i=0;
    let array = this.registeredCourse["userCourse"];
    let res = array.find(course => course.idCourse === idCourse);
    console.log("res");
    if(res) {
      return true
    } else {
      return false;
    }    
  }

  reloadData() {
    this.courseService.getAll()
    .subscribe((courses: CourseData[]) => {
      this.courses = courses;
      console.log(courses)
    })
  }

  listRegister(id: number) {
    this.router.navigateByUrl("course-user/"+id);
  }
}
