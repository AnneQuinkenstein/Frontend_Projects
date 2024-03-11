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
  private loggedIn: boolean = false;
  private user!: User | null;

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


  loginUser(nickname: string, password: string ): Observable<any>{
    return this.http.post(this.backendUrl + '/login/', { nickname: nickname, password: password }, {observe: 'response'});
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
    this.user = null;
  }

  getUser(): User | null {
    return this.user;
  }
}
