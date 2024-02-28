import {Component, inject, OnInit} from '@angular/core';
import {MilestonesService} from "../shared/milestones.service";
import {NextStep} from "../shared/next-step";
import {ActivatedRoute } from '@angular/router';
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-milestone',
  standalone: true,
  imports: [
    NgForOf
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

  private ms = inject(MilestonesService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readAllSteps(this.id);
    this.milestone = this.id;
  }
  readAllSteps( id: string) {
    this.ms.getNextStepsForMilestone(id).subscribe({
      next: (response) => {
        this.nextSteps = response;
        console.log(response);
        this.status = this.nextSteps[0].status
      },
      error: (err) => console.log(err),
      complete: () => console.log('getNextSteps() completed')
    })
  }

}
