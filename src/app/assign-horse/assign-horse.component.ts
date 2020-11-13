import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { UserData } from '../auth/user-data.model';
import { CourseData } from '../course-data.model';
import { CourseService } from '../course.service';
import { DialogData } from '../dialog-data.model';
import { HorseData } from '../horse-data.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-assign-horse',
  templateUrl: './assign-horse.component.html',
  styleUrls: ['./assign-horse.component.scss']
})
export class AssignHorseComponent implements OnInit {

  user: UserData;
  horses: HorseData[];
  courseId: number;
  userId: number;
  course: CourseData;

  form = new FormGroup({
    horseFormControl: new FormControl('', [Validators.required])
  })

  constructor(public courseService: CourseService,
    public router: Router, public route: ActivatedRoute, public dialog: MatDialog, public userService: UsersService) {
     }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get("courseId");
    this.userId = +this.route.snapshot.paramMap.get("userId");

    this.courseService.get(this.courseId)
    .subscribe((courseData: CourseData) => {
      this.course = courseData;
    })

    this.userService.getUserInfo(this.userId)
    .subscribe((user:UserData) => {
      this.user = user;
      console.log(user);
    })

    this.courseService.getAllHorsesAvalaible(this.courseId)
    .subscribe((horses: HorseData[]) => {
      this.horses = horses;
      console.log(horses);
    })
  }

  onSubmit(assignForm: NgForm) {
    let self = this;
    if(this.form.invalid) {
      console.log("invalid");
    } else {
      console.log(this.form.value.horseFormControl);
      this.courseService.assignHorse(
        this.userId,
        this.courseId,
        this.form.value.horseFormControl
        
      ).subscribe(function(data: DialogData) {
        console.log(data);
        const dialogRef = self.dialog.open(AlertDialogComponent, {
          data
        })
        if(data.success) {
          console.log("test");
          dialogRef.afterClosed().subscribe(() => self.router.navigate(['/']));
        }
      })
    }
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
