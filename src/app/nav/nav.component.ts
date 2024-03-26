import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../shared/user.service";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isLoggedIn = false;
  nickname: string = '';

  constructor(private us: UserService, private router: Router) {
    this.us.loggedInChange.subscribe(value => {
      this.isLoggedIn = value
      if (this.isLoggedIn) {
        this.us.userChange.subscribe(val => {
          console.log('nav user', val)
          this.nickname = val?.nickname;
          console.log('nav username', this.nickname)
        })

      }
    })
  }

  callLogout() {
    this.isLoggedIn = false;
    this.us.logout();
    this.router.navigate(['/login'])
  }

}


