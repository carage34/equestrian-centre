import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-user-view',
  templateUrl: './home-user-view.component.html',
  styleUrls: ['./home-user-view.component.scss']
})
export class HomeUserViewComponent implements OnInit {

  constructor() { }

  nbSeances: number;
  listSeances: Seance[] = [{name:"Seance1"},{name:"Seance2"},{name:"Seance3"}]

  ngOnInit(): void {
  }

  getSeanceInfo(info): void {
    console.log("getSeanceInfo")
    console.log(info)
  }

  registerSeance(): void {
    console.log("registerSeance")
  }

}

export interface Seance {
  name: string;
}