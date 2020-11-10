import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { AuthService } from '../auth/auth.service';
import { DialogData } from '../dialog-data.model';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  roleList = environment.ROLE_LIST;

  form = new FormGroup({
    lastNameFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    firstNameFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]),
    telephoneFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    passwordFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    passwordConfirmFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator, this.passwordMatchValidator]),
    licence: new FormControl(''),
    roleSelect: new FormControl('', [Validators.required])
  })

  constructor(public authService: AuthService, public router:Router, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  onSubmit(roleForm: NgForm) {
    let self = this;
    if(this.form.invalid) {
      console.log("invalid");
    } else {
      console.log(this.form.value.roleSelect);
      this.authService.createUser(
        this.form.value.firstNameFormControl,
        this.form.value.lastNameFormControl,
        this.form.value.emailFormControl,
        this.form.value.telephoneFormControl,
        this.form.value.passwordFormControl,
        this.form.value.licence,
        false,
        this.form.value.roleSelect
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
