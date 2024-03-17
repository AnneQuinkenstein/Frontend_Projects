import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {User} from "./user";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backendUrl = 'http://localhost:4000/users';
  private loggedIn: boolean = false;
  user: User = {nickname: '', password: ''};
  loggedInChange: Subject<boolean> = new Subject<boolean>();
  userChange: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {
    this.loggedInChange.subscribe((value) => {
      this.loggedIn = value
    });
    this.userChange.subscribe((value) => {
      this.user = value
    });
  }

  getOneUser(id: string): Observable<User> {
    return this.http.get<User>(this.backendUrl + '/' + id);
  }

  createNewUser(user: User): Observable<User> {
    let endpoint = '/register';
    return this.http.post<User>(this.backendUrl + endpoint, user);
  }

  loginUser(nickname: string, password: string): Observable<any> {
    return this.http.post(this.backendUrl + '/login/', {nickname: nickname, password: password}, {observe: 'response'});
  }

  login(user: User) {
    this.loggedIn = true
    this.loggedInChange.next(this.loggedIn);
    this.user = user;
    this.userChange.next(this.user);
    console.log('login() : ', this.user);
  }
  isLoggedIn() {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
    this.loggedInChange.next(this.loggedIn);
    this.user = {nickname: '', password: ''};
    this.userChange.next(this.user);
  }

}
