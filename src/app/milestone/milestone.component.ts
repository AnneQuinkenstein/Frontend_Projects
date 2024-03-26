import {Component, inject, OnInit} from '@angular/core';
import {MilestonesService} from "../shared/milestones.service";
import {NextStep} from "../shared/next-step";
import {ActivatedRoute} from '@angular/router';
import {NgForOf} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-milestone',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './milestone.component.html',
  styleUrl: './milestone.component.css'
})
export class MilestoneComponent implements OnInit {
  milestone: string = "";
  status: any = "";
  //TODO: warum geht hier nur any? und nicht string
  nextSteps: NextStep[] = [];
  id: string = '';
  search = new FormControl('');
  private ms = inject(MilestonesService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readAllSteps(this.id);
    this.milestone = this.id;
  }

  readAllSteps(id: string) {
    this.ms.getNextStepsForMilestone(id).subscribe({
      next: (response) => {
        this.nextSteps = response;
        this.status = this.nextSteps[0].status
      },
      error: (err) => console.log(err),
      complete: () => console.log('getNextSteps() completed')
    })
  }


  filterSteps() {
    let searchstring = this.search.value ? this.search.value.toLowerCase() : "";
    console.log("searchstring:" + searchstring);
    this.nextSteps = this.nextSteps.filter((step) => {
      return (step.todo.toLowerCase().includes(searchstring) || step.todo?.toLowerCase().includes(searchstring) || step.notes?.toLowerCase().includes(searchstring) || step.nickname?.toLowerCase().includes(searchstring));
    });
  }

  back() {
    this.readAllSteps(this.id);
    this.search.reset()
  }
}
