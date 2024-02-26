import {Component, inject, OnInit} from '@angular/core';
import {ProjectService} from "../shared/project.service";
import {Project} from "../shared/project";
import {DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  imports: [
    NgForOf,
    DatePipe,
    RouterLink
  ],
  styleUrl: './projects.component.css'
})

export class ProjectsComponent implements OnInit{

  ps = inject(ProjectService);
  allProjects: Project[] = [];
//allProjects!: Project[]
  projects?: Project;
  ngOnInit(): void {
    this.readAllProjects();
  }
  readAllProjects() {
    this.ps.getAllProjects().subscribe({
        next: (response) => {
          console.log(this.allProjects);
          this.allProjects = response;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAllProjects() completed')
      })
  }

  createNewProject(project: Project):void {
    this.ps.createNewProject(project).subscribe({
      next: (response) => console.log('response', response),
      error: (err) => console.log(err),
      complete: () => console.log('register completed')
    });
  }

  updateProject(project: Project, id: string): void {
    console.log('id to update', id)
    this.ps.updateProject(project, id).subscribe({
      next: (response) => {
        console.log(response);
        this.readAllProjects();
      },
      error: (err) => console.log(err),
      complete: () => console.log('deleteProject() completed')
    });
  }

deleteProject(id: string): void {
    console.log('id to delete', id)
    this.ps.deleteOneProject(id).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.readAllProjects();
        },
        error: (err) => console.log(err),
        complete: () => console.log('deleteProject() completed')
      })
  }

}
