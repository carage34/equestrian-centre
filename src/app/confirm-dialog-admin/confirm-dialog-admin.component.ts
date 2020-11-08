import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { DialogConfirmAdmin } from '../dialog-confirm-admin-data';
import { UsersService } from '../users.service';
import { DialogData } from '../dialog-data.model';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog-admin',
  templateUrl: './confirm-dialog-admin.component.html',
  styleUrls: ['./confirm-dialog-admin.component.scss']
})
export class ConfirmDialogAdminComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmAdmin, 
    public dialogRef: MatDialogRef<ConfirmDialogAdminComponent>, 
    public usersService: UsersService,
    public dialog: MatDialog,
    public router: Router) { }

  confirmRemove(id: number) {
    let self = this;
    console.log("plz");
    this.usersService.removeAdminAcess(id)
    .subscribe(function(data: DialogData) {
      console.log("bla");
      const dialogRef2 = self.dialog.open(AlertDialogComponent, {
        data
      })
      dialogRef2.afterClosed().subscribe(() => self.router.navigate(['/list-admin']));
    })
  }

  confirmAdd(id: number) {
    var self = this;
    this.closeDialog();
    this.usersService.addAdminAcess(id)
    .subscribe(function(data: DialogData) {
      const dialogRef = self.dialog.open(AlertDialogComponent, {
        data
      })
      dialogRef.afterClosed().subscribe(() => self.router.navigate(['/list-admin']));
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
