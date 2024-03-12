import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../shared/user";
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  private us = inject(UserService);
  nicknameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  private user?: User;
  private router = inject(Router);
  private url="";
  constructor(route: ActivatedRoute) {
    this.url = route.snapshot.url.join('');
  }

  private formValid() {
    return this.nicknameControl.valid && this.passwordControl.valid;
  }

  isRegistration(){
    console.log( this.url.endsWith("register"));
    return this.url.endsWith("register");
  }

  isLogin(){
    return !this.isRegistration();
  }


  register() {
    if (this.formValid()) {
      let user = {
        nickname: this.nicknameControl.value!,
        password: this.passwordControl.value!
      }
      this.us.createNewUser(user).subscribe({
        next: (response) => {
          console.log('response', response)
          this.user = response;
          let respo = this.us.loginUser(this.user.nickname, this.user.password)
          console.log("login: ",  respo);
          // this.router.navigate(['/projects/']);
          this.cancel()
        },
        error: (err) => console.log(err.error.message),
        complete: () => console.log(' createUser complete')
      });
      console.log('new user: ', user)
    } else {
      console.warn('form still invalid!')
    }
  }

  login(){
    if (this.formValid()) {
      let user = {
        nickname: this.nicknameControl.value!,
        password: this.passwordControl.value!
      }

    this.us.loginUser(user.nickname!, user.password!).subscribe({
        next: (response) => {
          console.log('login response',response);
          if(response.status == 200)
          {
            this.us.getOneUser(user.nickname!).subscribe(
              (response) => {
                this.us.login(user);
                this.router.navigate(['/projects']);
              }
            )
          } else {
            console.log('No login - username and/or password are incorrect')
          }
        },
        error: (err) => {
          console.log('login error',err);
        },
        complete: () => console.log('login completed')
      }
    )};
  }
  cancel() {
    this.nicknameControl.reset();
    this.passwordControl.reset();
  }


}
