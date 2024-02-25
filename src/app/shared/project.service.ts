import { Injectable } from '@angular/core';
import {Project} from "./project";


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  async getAllProjects(): Promise<Project[]> {
    let response = await fetch('http://localhost:4000/project')
    console.log('in service -> response', response)
    let projects = await response.json();
    console.log('in service -> projects', projects)
    return projects;
  }

}
