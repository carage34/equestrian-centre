import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../auth/user-data.model';
import { CourseData } from '../course-data.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-user',
  templateUrl: './course-user.component.html',
  styleUrls: ['./course-user.component.scss']
})
export class CourseUserComponent implements OnInit {
  id: number;
  course: CourseData;
  users: UserData[];
  constructor(public courseService: CourseService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.courseService.getAllUserCourse(this.id)
    .subscribe((users: UserData[]) => {
      console.log(users);
      this.users = users;
    })
    this.courseService.get(this.id)
    .subscribe((course: CourseData) => {
      this.course = course;
    })
  }

  assign(userId: number) {
    this.router.navigateByUrl('assign-horse/'+this.id+'/'+userId);
  }
}
