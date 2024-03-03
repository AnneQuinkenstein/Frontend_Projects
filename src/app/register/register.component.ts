import {Component, inject} from '@angular/core';
import {UserService} from "../shared/user.service";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private us = inject(UserService);

  nicknameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  private formValid() {
    return this.nicknameControl.valid && this.passwordControl.valid;
  }

  register() {

    if(this.formValid())
    {
      let user = {
        nickname: this.nicknameControl.value!,
        password: this.passwordControl.value!
      }

      this.us.createNewUser(user).subscribe({
        next: (response) => {
          console.log('response', response)
          this.cancel()
        },
        error: (err) => console.log(err),
        complete: () => console.log(' createUser complete')
      });
      console.log('new user: ', user)
    }
    else
    {
      console.warn('form still invalid!')
    }
  }
  cancel() {
    this.nicknameControl.reset();
    this.passwordControl.reset();
  }
}
