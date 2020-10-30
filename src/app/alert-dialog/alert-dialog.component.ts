import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../auth/dialog-data.model'

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<AlertDialogComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }

}
