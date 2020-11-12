import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  add(title: string, courseDate: Date, maxUser: number,  galop: number) {
    const courseData = {title:title, courseDate:courseDate, maxUser:maxUser, galop:galop};
    console.log("plz");
    console.log(courseData);
    return this.http.post(environment.API_BASE + "/course/add", courseData, {withCredentials: true});
  }

  getAll() {
    return this.http.get(environment.API_BASE + "/course/all");
  }
}
