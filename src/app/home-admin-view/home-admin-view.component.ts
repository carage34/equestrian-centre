import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin-view',
  templateUrl: './home-admin-view.component.html',
  styleUrls: ['./home-admin-view.component.scss']
})

export class HomeAdminViewComponent implements OnInit {

  constructor() { }

  public listHorses: Horse[] = [{name:'Cheval Fringuant'}, {name:'Jolly Jumper'}, {name:'Tornado'}];
  public nbHorses: number;

  ngOnInit(): void {
    this.nbHorses = this.listHorses.length;
  }

  addAdmin(): void {
    console.log("addAdmin")
  }
  
  addMono(): void {
    console.log("addMono")
  }
  
  editInfo(): void {
    console.log("editInfo")
  }
  
  addHorse(): void {
    console.log("onClickAddHorse")
  }

  getHorseInfo(info): void {
    console.log("getHorseInfo")
    console.log(info)
  }

  delHorse(info): void {
    console.log("delHorse")
    console.log(info)
  }

}

export interface Horse {
  name: string;
}