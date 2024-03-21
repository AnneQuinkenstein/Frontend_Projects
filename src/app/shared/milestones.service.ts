import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Milestone} from "./milestone";
import {NextStep} from "./next-step";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MilestonesService {
  backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMilestonesForProject(id: string): Observable<Milestone[]>{
    let endpoint = '/projects/milestones';
    return this.http.get<Milestone[]>(this.backendUrl + endpoint + '/' + id);
  }

  getNextStepsForMilestone(id: string): Observable<NextStep[]>{
    let endpoint = '/milestones';
    return this.http.get<NextStep[]>(this.backendUrl + endpoint + '/' + id);
  }

  createNewMilestone(milestone: Milestone): Observable<Milestone> {
    let endpoint = '/milestones';
    return this.http.post<Milestone>(this.backendUrl + endpoint, milestone);
  }

}
