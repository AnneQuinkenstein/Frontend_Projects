import { Routes } from '@angular/router';
import {ProjectsComponent} from "./projects/projects.component";
import {ProjectUpdateComponent} from "./projectupdate/projectupdate.component";
import {RegisterComponent} from "./register/register.component";
import {MilestoneComponent} from "./milestone/milestone.component";
import {UsersComponent} from "./users/users.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'projects', component: ProjectsComponent, pathMatch: 'full'},
  { path: 'projects/:id', component: ProjectUpdateComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'milestone/:id', component: MilestoneComponent },
  { path: 'users', component: UsersComponent, pathMatch: 'full'},
  { path: 'users/register', component: RegisterComponent },
];
