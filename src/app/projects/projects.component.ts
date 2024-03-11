import {Component, inject, OnInit} from '@angular/core';
import {ProjectService} from "../shared/project.service";
import {Project} from "../shared/project";
import {DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MilestonesService} from "../shared/milestones.service";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

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
  projectNameControl = new FormControl<string>('', [Validators.required, Validators.maxLength(25)]);
  topicControl = new FormControl<string>('');
  deadlineControl = new FormControl<string>('', Validators.pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[01])\/((19|20)\d\d)$/));
  search = new FormControl('');

  ngOnInit(): void {
    this.readAllProjects();
  }

  readAllProjects() {
    this.ps.getAllProjects().subscribe({
      next: (response) => {
        this.allProjects = response;
        this.addMilestonesToProject(response);
      },
      error: (err) => console.log(err),
      complete: () => console.log('getAllProjects() completed')
    })
  }

  addMilestonesToProject(allProjects: Project[]) {
    allProjects.forEach((project, i) => {
      this.ms.getMilestonesForProject(project.project_id!).subscribe(response => {
        allProjects[i].milestone_name = response.map(milestone => milestone.milestone_name);
      });
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

  createNewProject() {
    if (this.formValid()) {
      let project = {
        project_id: '',
        project_name : this.projectNameControl.value!,
        topic : this.topicControl.value!,
        deadline : this.deadlineControl.value!
      }
      console.log(project);


      this.ps.createNewProject(project).subscribe({
          next: (response) => {
            console.log(response);
            this.cancel();
            this.readAllProjects();
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => console.log('update() completed')
        }
      );
    }
     else {
       console.warn('form still invalid!')
    }

    }

  private formValid() {
    return this.projectNameControl.valid && this.deadlineControl.valid;
  }

  private cancel() {
    this.projectNameControl.reset();
    this.topicControl.reset();
    this.deadlineControl.reset();
  }

  filterProjects(){
    let searchstring = this.search.value? this.search.value.toLowerCase(): "";
    console.log("searchstring:" + searchstring);
    this.allProjects = this.allProjects.filter( (project) => {
      return (project.project_name.toLowerCase().includes(searchstring) || project.topic?.toLowerCase().includes(searchstring) || project.deadline?.toLowerCase().includes(searchstring) || project.milestone_name?.join().toLowerCase().includes(searchstring));
    });
  }

  back() {
    this.readAllProjects();
    this.search.reset()
  }
}
