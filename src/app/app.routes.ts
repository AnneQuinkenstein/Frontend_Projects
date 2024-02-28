import { Routes } from '@angular/router';
import {ProjectsComponent} from "./projects/projects.component";
import {ProjectsUpdateComponent} from "./projects-update/projects-update.component";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
  { path: '', component: ProjectsComponent, pathMatch: 'full'},
  { path: 'projects', component: ProjectsComponent, pathMatch: 'full'},
  { path: 'projects/:id', component: ProjectsUpdateComponent },
  { path: 'register', component: RegisterComponent }
];
