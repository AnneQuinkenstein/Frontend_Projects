import {Component, inject, OnInit} from '@angular/core';
import {ProjectService} from "../shared/project.service";
import {Project} from "../shared/project";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  imports: [
    NgForOf
  ],
  styleUrl: './projects.component.css'
})

export class ProjectsComponent implements OnInit{

  ps = inject(ProjectService);
allProjects: Project[] = [];
//allProjects!: Project[]

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

}
