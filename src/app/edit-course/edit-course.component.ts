import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { CourseData } from '../course-data.model';
import { CourseService } from '../course.service';
import { DialogData } from '../dialog-data.model';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private courseService: CourseService, private route: ActivatedRoute) { }

  
  public date: Date;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: Date;
  public maxDate: Date;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  private id: number;
  public courseData;

  form = new FormGroup({
    titleFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    courseDateFormControl: new FormControl(new Date("")),
    maxUserFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    galopFormControl: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.getCourse(this.id);
  }

  getCourse(id: number) {
    this.courseService
    .get(this.id)
    .subscribe((courseData:CourseData) => {
      console.log(courseData);
      this.courseData = courseData
    }),
    err => {
      console.error(err);
    }
  }

  onSubmit(courseForm: NgForm) {
    let self = this
    if(this.form.invalid) {
      console.log("invalid");
    } else {
      this.courseService.update(
        this.form.value.titleFormControl,
        this.form.value.courseDateFormControl,
        this.form.value.maxUserFormControl,
        this.form.value.galopFormControl,
        this.id
      )
      .subscribe(function(data: DialogData) {
        if(data.success) {
          const dialogRef2 = self.dialog.open(AlertDialogComponent, {
            data
          })
          dialogRef2.afterClosed().subscribe(() => {
            self.router.navigate(['/']);
          });
        } else {
          const dialogRef = self.dialog.open(AlertDialogComponent, {
            data
          })
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
