import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HorseData } from './horse-data.model';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

  constructor(private http: HttpClient) { }

  add(name: string, race: string, age: number) {
    const horseData: HorseData = {name: name, race: race, age: age, id: null };
    console.log("plz");
    console.log(horseData);
    return this.http.post(environment.API_BASE + "/horse/add", horseData, {withCredentials: true});
  }

  getAll() {
    return this.http.get(environment.API_BASE + "/horse/all");
  }
}
