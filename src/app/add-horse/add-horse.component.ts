import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { DialogData } from '../dialog-data.model';
import { HorseService } from '../horse.service';

@Component({
  selector: 'app-add-horse',
  templateUrl: './add-horse.component.html',
  styleUrls: ['./add-horse.component.scss']
})
export class AddHorseComponent implements OnInit {

  constructor(private router: Router, private horseService: HorseService, public dialog: MatDialog) { }

  form = new FormGroup({
    nameFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    raceFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    ageFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
  })

  ngOnInit(): void {
  }

  onSubmit(horseForm: NgForm) {
    let self = this
    if(this.form.invalid) {
      console.log("invalid");
    } else {
      this.horseService.add(
        this.form.value.nameFormControl,
        this.form.value.raceFormControl,
        this.form.value.ageFormControl
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
