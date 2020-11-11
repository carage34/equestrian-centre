import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-super-view',
  templateUrl: './home-super-view.component.html',
  styleUrls: ['./home-super-view.component.scss']
})

export class HomeSuperViewComponent implements OnInit {

  constructor() { }

  public listAdmins: Admin[] = [{name:'admin1@test.com'}, {name:'admin2@test.com'}, {name:'admin3@test.com'}];
  nbAdmin: number;

  ngOnInit(): void {
    this.nbAdmin = this.listAdmins.length;
  }

  onClickAdd(): void {
    console.log("ADD")
  }

  onClickDel(info): void {
    console.log("DEL")
    console.log(info)
  }
  
}

export interface Admin {
  name: string;
}