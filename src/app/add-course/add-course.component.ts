import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { CourseService } from '../course.service';
import { DialogData } from '../dialog-data.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private courseService: CourseService) { }

  
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

  form = new FormGroup({
    titleFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    courseDateFormControl: new FormControl('13/11/2020 11:00'),
    maxUserFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    galopFormControl: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
  }

  onSubmit(courseForm: NgForm) {
    let self = this
    if(this.form.invalid) {
      console.log("invalid");
    } else {
      this.courseService.add(
        this.form.value.titleFormControl,
        this.form.value.courseDateFormControl,
        this.form.value.maxUserFormControl,
        this.form.value.galopFormControl
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
