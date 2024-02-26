import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";
import {Project} from "./project";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {
  }

  createNewUser(user: User): Observable<User> {
    let endpoint = '/user';
    return this.http.post<User>(this.backendUrl + endpoint, user);
  }

}
