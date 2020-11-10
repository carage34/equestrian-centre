import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../auth/user-data.model';
import { UsersService } from '../users.service';
import {DialogConfirmAdmin} from '../dialog-confirm-admin-data';
import { ConfirmDialogAdminComponent } from '../confirm-dialog-admin/confirm-dialog-admin.component';
import { environment } from 'src/environments/environment';
import { stringify } from 'querystring';
import { DialogData } from '../dialog-data.model';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';

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
  adminRole = environment.ROLE_LIST.ADMIN.id;
  superAdminRole = environment.ROLE_LIST.SUPER_ADMIN.id;
  userRole = environment.ROLE_LIST.USER.id;
  firstnameFilter: string;
  lastnameFilter: string;

  constructor(private authService: AuthService, private usersService: UsersService, public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    let self = this;
    this.usersService
    .getAllSuperAdmin()
    .subscribe(function(user: UserData[]) {
      let search = "a";
      let test = user.filter(x => x.firstname.toLowerCase().includes(search.toLowerCase()));
      console.log("test");
      console.log(test);
      self.superAdmins = user;
      console.log(self.superAdmins);
    })
  }

  firstNameFilterChanged() {
    this.getFilteredData("firstname", this.firstnameFilter);
  }

  lastNameFilteredChanged() {
    this.getFilteredData("lastname", this.lastnameFilter);
  }

  getFilteredData(filter: string, filterData: string) {
    let self = this;
    this.usersService
    .getAllSuperAdmin()
    .subscribe(function(user: UserData[]) {
      let dataFiltered = user;
      if(filter === "firstname") {
        filterData = filterData.toLowerCase();
        dataFiltered = dataFiltered.filter(x => x.firstname.toLowerCase().includes(filterData));
        console.log(dataFiltered);
      } else {
        dataFiltered = user.filter(x => x.lastname.toLowerCase().includes(filterData));
      }
      self.superAdmins = dataFiltered;
    })
  }

  popUpAlert(id, firstname, lastname, roleId) {
    console.log(firstname);
    console.log(lastname);
    console.log("test");
    if(roleId == this.userRole) {
      this.message = "Attribuer les droits administrateur à";
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
    dialogRef.afterClosed().subscribe((result) => {
      if(result === "remove") {
        this.confirmRemove(id);
      } else if(result == "add") {
        this.confirmAdd(id);
      } else {
        dialogRef.close();
      }
    });
  }

  confirmRemove(id: number) {
    let self = this;
    console.log("plz");
    this.usersService.removeAdminAcess(id)
    .subscribe(function(data: DialogData) {
      console.log("bla");
      self.reloadData()
      const dialogRef2 = self.dialog.open(AlertDialogComponent, {
        data
      })
    })
  }

  confirmAdd(id: number) {
    var self = this;
    this.usersService.addAdminAcess(id)
    .subscribe(function(data: DialogData) {
      self.reloadData()
      const dialogRef = self.dialog.open(AlertDialogComponent, {
        data
      });
    })
  }

  reloadData() {
    let self = this;
    this.usersService
    .getAllSuperAdmin()
    .subscribe(function(user: UserData[]) {
      console.log("plz data");
      self.superAdmins = user;
      console.log(self.superAdmins);
    })
  }

  show(id: number) {
    this.router.navigateByUrl('show-user/'+id);
  }

}
