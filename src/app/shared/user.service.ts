import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";
import {Project} from "./project";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendUrl = 'http://localhost:4000/users';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.backendUrl);
  }
  getOneUser(id: string): Observable<User>{
    return this.http.get<User>(this.backendUrl + '/' + id);
  }
  createNewUser(user: User): Observable<User> {
    let endpoint = '/register';
    return this.http.post<User>(this.backendUrl + endpoint, user);
  }

}
