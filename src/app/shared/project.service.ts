import { Injectable } from '@angular/core';
import {Project} from "./project";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  backendUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.backendUrl + '/projects');
  }

  getOneProject(id: string): Observable<Project>{
    let endpoint = '/projects';
    return this.http.get<Project>(this.backendUrl + endpoint + '/' + id);
  }

  createNewProject(project: Project): Observable<Project> {
    let endpoint = '/projects';
    return this.http.post<Project>(this.backendUrl + endpoint, project);
  }

  updateProject(project: Project, id: string): Observable<Project> {
    let endpoint = '/projects';
    return this.http.put<Project>(this.backendUrl + endpoint + "/" + id, project);
  }

  deleteOneProject(id: string): Observable<any> {
    let endpoint = '/projects';
    return this.http.delete<any>(this.backendUrl + endpoint + "/" + id);
  }

}
