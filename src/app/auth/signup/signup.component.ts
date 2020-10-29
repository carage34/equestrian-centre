import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroupDirective, Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { AuthService } from "../auth.service";
import { DialogData } from '../dialog-data.model'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  
  form = new FormGroup({
    lastNameFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    firstNameFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]),
    passwordFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    passwordConfirmFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator, this.passwordMatchValidator]),
    licence: new FormControl('', [Validators.required, this.noWhitespaceValidator])
  })

  constructor(public authService: AuthService, public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
  }

  onSignup(signupForm: NgForm) {
    let self = this;
    if(this.form.invalid) {
      console.log("invalid");
    } else {
      console.log(this.form.value.firstNameFormControl);
      this.authService.createUser(
        this.form.value.firstNameFormControl,
        this.form.value.lastNameFormControl,
        this.form.value.emailFormControl,
        this.form.value.passwordFormControl,
        this.form.value.licence
      ).subscribe(function(data: DialogData) {
        console.log(data);
        const dialogRef = self.dialog.open(AlertDialogComponent, {
          data
        })
        if(data.success) {
          self.authService.setLoggedIn(true);
          dialogRef.afterClosed().subscribe(() => self.router.navigate(['/login']));
        }
      })
    }
  }
  
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  passwordMatchValidator(control: AbstractControl) {
    let parent = control.parent;
    if(parent) {
      let password = parent.get("passwordFormControl").value;
      let confirmPassword = control.value;

      if(password != confirmPassword) {
        return { ConfirmPassword: true};
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
