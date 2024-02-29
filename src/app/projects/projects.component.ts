import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {ProjectService} from "../shared/project.service";
import {Project} from "../shared/project";
import {DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MilestonesService} from "../shared/milestones.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  imports: [
    NgForOf,
    DatePipe,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrl: './projects.component.css'
})

export class ProjectsComponent implements OnInit {

  ps = inject(ProjectService);
  ms = inject(MilestonesService);

  allProjects: Project[] = [];
//allProjects!: Project[]
  project?: Project;


  ngOnInit(): void {
    this.readAllProjects();
  }

  readAllProjects() {
    this.ps.getAllProjects().subscribe({
      next: (response) => {
        this.allProjects = response;
        this.addMilesstonestoProject(response);
      },
      error: (err) => console.log(err),
      complete: () => console.log('getAllProjects() completed')
    })
  }

  addMilesstonestoProject(allProjects: Project[]) {
    for (let i = 0; i < allProjects.length; i++) {
      this.ms.getMilestonesForProject(allProjects[i].project_id!).subscribe(
        {
          next: (response) => {
            let milestones = [];
            for (let i = 0; i < response.length; i++) {
              milestones[i] = response[i].milestone_name
            }
            allProjects[i].milestone_name = milestones;
          },
          error: (err) => console.log(err),
          complete: () => console.log('getallMilestones for Project ' + allProjects[i].project_name + ' completed')
        })
    }

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



    projectNameControl = new FormControl<string>('')
    topicControl =  new FormControl<string>('')
    deadlineControl = new FormControl<string>('')


  createNewProject() {

    let project = {
      project_id: '',
      project_name : this.projectNameControl.value!,
      topic : this.topicControl.value!,
      deadline : this.deadlineControl.value!
    }
    console.log(project);

    //TODO topic und deadline müssen nicht ausgefüllt werden
    //TODO deadline mind. validierung, wie das Dateformat sein muss

      this.ps.createNewProject(project).subscribe({
            next: (response) => {
              console.log(response);
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => console.log('update() completed')
          }
        );

      this.readAllProjects();
    }

}
