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
  {path: 'list-admin', component: ManageAdminComponent, canActivate: [AuthGuard]},
  {path: 'show-user/:id', component: DisplayUserComponent, canActivate: [AuthGuard]},
  {path: 'add-account', component: AddAccountComponent, canActivate: [AuthGuard]},
  {path: 'add-horse', component: AddHorseComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: EditUserComponent, canActivate: [AuthGuard]},
  {path: 'add-course', component: AddCourseComponent, canActivate: [AuthGuard]},
  {path: 'edit-course/:id', component: EditCourseComponent, canActivate: [AuthGuard]},
  {path: 'course-user/:id', component: CourseUserComponent, canActivate: [AuthGuard]},
  {path: 'assign-horse/:courseId/:userId', component: AssignHorseComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
