import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../auth/user-data.model';
import { CourseData } from '../course-data.model';
import { CourseService } from '../course.service';
import { HorseData } from '../horse-data.model';
import { HorseService } from '../horse.service';
import { UserCourseHorse } from '../user-course-horse-data.model';

@Component({
  selector: 'app-course-user',
  templateUrl: './course-user.component.html',
  styleUrls: ['./course-user.component.scss']
})
export class CourseUserComponent implements OnInit {
  id: number;
  course: CourseData;
  users: UserData[];
  assignHorse: UserCourseHorse[];
  horses: HorseData[];
  user: UserData[];
  constructor(public courseService: CourseService, public router: Router, public route: ActivatedRoute, public horseService: HorseService, public authService: AuthService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.courseService.getAllUserCourse(this.id)
    .subscribe((users: UserData[]) => {
      this.users = users;
    })
    this.courseService.get(this.id)
    .subscribe((course: CourseData) => {
      this.course = course;
    })
    this.courseService.getAllHorseUser(this.id)
    .subscribe((assignHorse: UserCourseHorse[]) => {
      this.assignHorse = assignHorse;
      console.log(assignHorse);
    })

    this.horseService.getAll()
    .subscribe((horses:HorseData[]) => {
      this.horses = horses;
      console.log(horses);
    })

    this.authService
    .profile()
    .subscribe(
      user => {
        this.user = user;
      }
    )
  }

  getAssignedHorse(userId: number) {
    let array = this.assignHorse["userCourseHorse"];
    let res = this.assignHorse.find(horse => horse.idUser === userId);
    console.log(res)
    if(!res) {
      return false;
    } else {
      let res2 = this.horses.find(horse => horse.id === res.idHorse);
      return res2.name;
    }
  }
  assign(userId: number) {
    this.router.navigateByUrl('assign-horse/'+this.id+'/'+userId);
  }
}
