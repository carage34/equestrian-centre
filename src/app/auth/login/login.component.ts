import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { AuthService } from '../auth.service';
import { UserData } from '../user-data.model';
import { DialogData } from '../dialog-data.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    passwordFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
  })

  constructor(public authService: AuthService, public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  onLogin(loginForm: NgForm) {
    let self = this
    if(this.form.invalid) {
      console.log("invalid");
    } else {
      this.authService.login(
        this.form.value.emailFormControl,
        this.form.value.passwordFormControl
      )
      .subscribe(function(data: DialogData) {
        if(data.success) {
          localStorage.auth = true;
          self.router.navigate(['/']);
        } else {
          const dialogRef = self.dialog.open(AlertDialogComponent, {
            data
          })
        }
      })
    }
  }
}
