import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  add(title: string, courseDate: Date, maxUser: number,  galop: number) {
    const courseData = {title:title, courseDate:courseDate, maxUser:maxUser, galop:galop, id: null};
    console.log("plz");
    console.log(courseData);
    return this.http.post(environment.API_BASE + "/course/add", courseData, {withCredentials: true});
  }

  getAll() {
    return this.http.get(environment.API_BASE + "/course/all");
  }

  get(id:number) {
    return this.http.get(environment.API_BASE + "/course/get/"+id);
  }

  update(title, courseDate, maxUser, galop, id) {
    const courseData = {title:title, courseDate:courseDate, maxUser:maxUser, galop:galop, id: id};
    console.log(courseData);
    return this.http.post(environment.API_BASE + "/course/edit", courseData, {withCredentials: true});
  }

  addUserToCourse(idUser: number, idCourse: number) {
    return this.http.get(environment.API_BASE + "/course/addUserCourse/"+idUser+"/"+idCourse);
  }

  removeUserToCourse(idUser: number, idCourse: number) {
    return this.http.get(environment.API_BASE + "/course/removeUserCourse/"+idUser+"/"+idCourse);
  }

  isUserRegistered(idUser: number) {
    return this.http.get(environment.API_BASE + "/course/isRegistered/"+idUser+"/"+0);
  }

  getAllUserCourse(idCourse: number) {
    return this.http.get(environment.API_BASE + "/course/getUserCourse/" + idCourse);
  }

  assignHorse(userId: number, courseId: number, horseId: number) {
    return this.http.get(environment.API_BASE + "/course/assignHorse/"+userId+"/"+courseId+"/"+horseId);
  }

  getAllUsersForCourse(courseId: number) {
    return this.http.get(environment.API_BASE + "/course/getUserRegistered/" + courseId);
  }

  getAllHorsesAvalaible(courseId: number) {
    return this.http.get(environment.API_BASE + "/course/getAvailableHorse/" + courseId);
  }

  getAllHorseUser(courseId: number) {
    return this.http.get(environment.API_BASE + "/course/getAllHorsesUsers/" + courseId);
  }
}
