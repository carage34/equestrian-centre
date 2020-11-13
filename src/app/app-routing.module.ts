import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component'
import { HomeComponent } from './home/home.component'
import { AuthGuard } from './auth/auth-guard.service';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { DisplayUserComponent } from './display-user/display-user.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddHorseComponent } from './add-horse/add-horse.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CourseUserComponent } from './course-user/course-user.component';
import { AssignHorseComponent } from './assign-horse/assign-horse.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'list-admin', component: ManageAdminComponent},
  {path: 'show-user/:id', component: DisplayUserComponent},
  {path: 'add-account', component: AddAccountComponent},
  {path: 'add-horse', component: AddHorseComponent},
  {path: 'profile', component: EditUserComponent},
  {path: 'add-course', component: AddCourseComponent},
  {path: 'edit-course/:id', component: EditCourseComponent},
  {path: 'course-user/:id', component: CourseUserComponent},
  {path: 'assign-horse/:courseId/:userId', component: AssignHorseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
