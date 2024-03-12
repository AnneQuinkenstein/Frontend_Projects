import { Routes } from '@angular/router';
import {ProjectsComponent} from "./projects/projects.component";
import {ProjectUpdateComponent} from "./projectupdate/projectupdate.component";
import {RegisterComponent} from "./register/register.component";
import {MilestoneComponent} from "./milestone/milestone.component";
import {HomeComponent} from "./home/home.component";
import {AuthguardGuard} from "./authguard.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'projects', component: ProjectsComponent, pathMatch: 'full', canActivate: [AuthguardGuard] },
  { path: 'projects/:id', component: ProjectUpdateComponent, canActivate: [AuthguardGuard]},
  { path: 'milestone/:id', title: "Milestones", component: MilestoneComponent, canActivate: [AuthguardGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: RegisterComponent },
  { path: '**', component:HomeComponent},
];
