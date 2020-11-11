import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-mono-view',
  templateUrl: './home-mono-view.component.html',
  styleUrls: ['./home-mono-view.component.scss']
})
export class HomeMonoViewComponent implements OnInit {

  constructor() { }

  nbSeances: number;
  listSeances: Seance[] = [{name:"Seance1"},{name:"Seance2"},{name:"Seance3"}]

  ngOnInit(): void {
  }

  editInfo(): void {
    console.log("editInfo")
  }

  addSeance(): void {
    console.log("addSeance")
  }

  getSeanceInfo(info): void {
    console.log("getSeanceInfo")
    console.log(info)
  }

}

export interface Seance {
  name: string;
}