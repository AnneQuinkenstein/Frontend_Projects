import { Routes } from '@angular/router';
import {ProjectsComponent} from "./projects/projects.component";

export const routes: Routes = [
  { path: '', component: ProjectsComponent, pathMatch: 'full'},
  { path: 'project', component: ProjectsComponent, pathMatch: 'full'},
  { path: 'project/:id', component: ProjectsComponent }
];
