import { Injectable } from '@angular/core';
import {Project} from "./project";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.baseUrl + '/project');
  }

}
