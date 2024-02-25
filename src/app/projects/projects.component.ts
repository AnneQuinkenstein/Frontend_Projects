import {Component, inject, OnInit} from '@angular/core';
import {ProjectService} from "../shared/project.service";
import {Project} from "../shared/project";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent implements OnInit{

  ps = inject(ProjectService);
  allProjects: Project[] = [];

  async ngOnInit(): Promise<void> {
    this.allProjects = await this.ps.getAllProjects()
    console.log('in table --> allProjects', this.allProjects)
  }

}
