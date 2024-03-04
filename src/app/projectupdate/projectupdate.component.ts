import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project';
import { ActivatedRoute, Router } from '@angular/router';

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
  closeResult = '';

  projectNameControl = new FormControl<string>('', [Validators.required, Validators.maxLength(25)]);
  topicControl = new FormControl<string>('');
  deadlineControl = new FormControl<string>('', Validators.pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[01])\/((19|20)\d\d)$/));

  private modalService = inject(NgbModal);
  private ps = inject(ProjectService)
  private route = inject(ActivatedRoute)
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
          this.topicControl.setValue(this.project.topic ? this.project.topic : null);
          this.deadlineControl.setValue(this.project.deadline? this.project.deadline : null);
          return this.project;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getOne() completed')
      });
  }


  register(content: TemplateRef<any>) {

    if(this.projectNameControl.valid)
    {
      let project = {
        project_id: '',
        project_name: this.projectNameControl.value!,
        topic: this.topicControl.value ? this.topicControl.value : undefined,
        deadline: this.deadlineControl.value ? this.deadlineControl.value : undefined
      }

      this.ps.updateProject(project, this.id).subscribe({
        next: (response) => console.log('response', response),
        error: (err) => console.log(err),
        complete: () => console.log('update completed')
      });

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
        .then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
            this.router.navigate(['/projects']);
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          },
        );

      console.log('new project: ', this.project)
    }
    else
    {
      console.warn('form still invalid!')
    }
  }

  cancel() {
    this.projectNameControl.reset();
    this.topicControl.reset();
    this.deadlineControl.reset();
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
