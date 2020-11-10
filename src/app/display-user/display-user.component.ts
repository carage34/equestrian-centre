import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../auth/auth.service';
import { UserData } from '../auth/user-data.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent implements OnInit {

  id: number;
  user: UserData;

  constructor(private route: ActivatedRoute, private userService: UsersService) { }

   ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.getUser(this.id);
  }

  getUser(id: number) {
    let self = this;
    this.userService
    .getUserInfo(this.id)
    .subscribe(function(user: UserData) {
      self.user = user;
      if(!user.licence) user.licence = "";
      console.log(this.user);
    }),
    err => {
      console.error(err);
    }
  }
}
