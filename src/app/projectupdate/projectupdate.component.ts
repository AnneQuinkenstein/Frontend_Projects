import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './projectupdate.component.html',
  styleUrl: './projectupdate.component.css'
})
export class ProjectUpdateComponent implements OnInit{
  id: string = '';
  project!: Project;

  projectNameControl = new FormControl<string>('', [Validators.required]);
  topicControl = new FormControl<string>('');
  deadlineControl = new FormControl<string>('', Validators.pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[01])\/((19|20)\d\d)$/));

  private ps = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private location: Location = inject(Location);
  private router = inject(Router);



  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readOne(this.id);
  }

  readOne(id: string): void {
    this.ps.getOneProject(id).subscribe(
      {
        next: (response: Project) => {
          this.project = response;
          console.log(this.project);
          this.projectNameControl.setValue(this.project.project_name);
        /*  console.log("this.project.project_name) " + this.project.project_name)
          console.log("this.projectNameControl " + this.projectNameControl.value )*/
          this.topicControl.setValue(this.project.topic ? this.project.topic : null);
          this.deadlineControl.setValue(this.project.deadline? this.project.deadline : null);
        },
        error: (err) => console.log(err),
        complete: () => console.log('getOne() completed')
      });
  }


  update() {
    if(this.projectNameControl.valid)
    {
      let project = {
        project_id: '',
        project_name: this.projectNameControl.value!,
        topic: this.topicControl.value,
        deadline: this.deadlineControl.value
      }

      this.ps.updateProject(project, this.id).subscribe({
        next: (response) => console.log('response', response),
        error: (err) => console.log("updateProject" + err),
        complete: () => console.log('update completed')
      });

      console.log('new project: ', this.project)
      this.router.navigateByUrl('/projects');
    }
    else
    {
      console.warn('form still invalid!')
    }
  }

  cancel() {
    this.location.back();
  }

}
