import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "./project";
import {HttpClient} from "@angular/common/http";
import {Milestone} from "./milestone";


@Injectable({
  providedIn: 'root'
})
export class MilestonesService {
  backendUrl = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getMilestonesForProject(id: string): Observable<Milestone[]>{
    let endpoint = '/projects/milestones';
    return this.http.get<Milestone[]>(this.backendUrl + endpoint + '/' + id);
  }

}
