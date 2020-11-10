import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { DialogConfirmAdmin } from '../dialog-confirm-admin-data';
import { UsersService } from '../users.service';
import { DialogData } from '../dialog-data.model';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';
import { ManageAdminComponent } from '../manage-admin/manage-admin.component';

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

  closeDialog() {
    this.dialogRef.close();
  }
}
