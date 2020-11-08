import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../auth/user-data.model';
import { UsersService } from '../users.service';
import {DialogConfirmAdmin} from '../dialog-confirm-admin-data';
import { ConfirmDialogAdminComponent } from '../confirm-dialog-admin/confirm-dialog-admin.component';
import { environment } from 'src/environments/environment';
import { stringify } from 'querystring';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit {
  superAdmins: UserData[];
  displayedColumns: string[] = ['firstname', 'lastname', 'actions'];
  message: string;
  action: string;
  adminRole = environment.ADMIN;
  superAdminRole = environment.SUPER_ADMIN;
  userRole = environment.USER;

  constructor(private authService: AuthService, private userService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let self = this;
    this.userService
    .getAllSuperAdmin()
    .subscribe(function(user: UserData[]) {
      self.superAdmins = user;
      console.log(self.superAdmins);
    })
  }

  popUpAlert(id, firstname, lastname, roleId) {
    console.log(firstname);
    console.log(lastname);
    console.log("test");
    if(roleId == this.userRole) {
      this.message = "Attribuer les droit administrateur à";
      this.action = "add";
    } else {
      this.message = "Retirer les droits administrateur de";
      this.action = "remove";
    }

    const data : DialogConfirmAdmin = {
    title: "Statut administrateur", 
    message: this.message, 
    firstname: firstname, 
    lastname: lastname,
    id: id,
    action: this.action
  }
    const dialogRef = this.dialog.open(ConfirmDialogAdminComponent, {
      data
    })
  }
}
