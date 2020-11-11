import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { AuthService, UserDetails } from '../auth/auth.service';
import { UserData } from '../auth/user-data.model';
import { DialogData } from '../dialog-data.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: UserData;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  form = new FormGroup({
    lastNameFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    firstNameFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]),
    telephoneFormControl: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    licence: new FormControl('')
  })

  ngOnInit(): void {
    this.authService
      .profile()
      .subscribe(
        user => {
          this.user = user;
          console.log(user);
        }
      )
  }

  onUpdate(updateForm: NgForm) {
    let self = this;
    if (this.form.invalid) {
      console.log("invalid");
    } else {
      console.log(this.form.value.firstNameFormControl);
      this.authService.updateProfile(
        this.form.value.firstNameFormControl,
        this.form.value.lastNameFormControl,
        this.form.value.emailFormControl,
        this.form.value.telephoneFormControl,
        this.form.value.licence,
        this.user.id
      ).subscribe(function (data: DialogData) {
        console.log(data);
        const dialogRef = self.dialog.open(AlertDialogComponent, {
          data
        })
        if (data.success) {
          console.log("test");
          dialogRef.afterClosed().subscribe(() => self.reloadData());
        }
      })
    }
  }

  reloadData() {
    this.authService
    .profile()
    .subscribe(
      user => {
        this.user = user;
        console.log(user);
      }
    )
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
