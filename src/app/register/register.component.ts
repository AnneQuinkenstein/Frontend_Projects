import {Component, inject, TemplateRef} from '@angular/core';
import {UserService} from "../shared/user.service";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../shared/user";
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nicknameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  closeResult = "";
  isRegistered = false;
  loginError = false;
  errorMessage = "";
  private us = inject(UserService);
  private modalService = inject(NgbModal);
  private router = inject(Router);
  private user?: User;
  private url = "";

  constructor(route: ActivatedRoute) {
    this.url = route.snapshot.url.join('');
  }

  isRegistration() {
    return this.url.endsWith("register");
  }

  isLogin() {
    return !this.isRegistration();
  }

  register(content: TemplateRef<any>) {
    if (this.formValid()) {
      let user = {
        nickname: this.nicknameControl.value!,
        password: this.passwordControl.value!
      }
      this.us.createNewUser(user).subscribe({
        next: (response) => {
          this.user = response;
          this.loginUser(user, content);
          this.isRegistered = true;
        },
        error: (err) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message;
          this.cancel();
        },
        complete: () => console.log(' createUser complete')
      });

      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
        .then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
            this.router.navigate(['/projects']);
          },
        );
    } else {
      this.errorMessage = "form still invalid!";
    }
  }

  login(content: TemplateRef<any>) {
    if (this.formValid()) {
      let user = {
        nickname: this.nicknameControl.value!,
        password: this.passwordControl.value!
      }
      this.loginUser(user, content)
    }
  }

  loginUser(user: User, content: TemplateRef<any>) {
    this.us.loginUser(user.nickname!, user.password!).subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.loginError = false;
            this.us.getOneUser(user.nickname!).subscribe(
              (response) => {
                this.us.login(user);
                this.router.navigate(['/projects']);
              }
            )
          } else {
            this.loginError = true;
            this.errorMessage = 'No login - username and/or password are incorrect';
          }
        },
        error: (err) => {
          this.loginError = true;
          err.error.error ? this.errorMessage = err.error.error : this.errorMessage = err.error.message;
          this.cancel();
        },
        complete: () => console.log('login completed')
      }
    );

    if (this.isLogin()) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
        .then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
            this.router.navigate(['/projects']);
          },
        );
    }
  }

  cancel() {
    this.nicknameControl.reset();
    this.passwordControl.reset();
  }

  registrationOK() {
    return this.isRegistered;
  }

  loginErrorDisplay() {
    return this.loginError;
  }

  private formValid() {
    return this.nicknameControl.valid && this.passwordControl.valid;
  }
}
