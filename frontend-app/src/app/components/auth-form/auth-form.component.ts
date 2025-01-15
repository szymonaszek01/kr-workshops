import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  isEmailInvalid(): boolean | undefined {
    console.log(this.loginForm.get('email')?.errors);
    return this.loginForm.get('email')?.touched && this.loginForm.get('email')?.invalid;
  }

  getEmailErrorMessage(): string {
    const errors = this.loginForm.get('email')?.errors;
    if (!errors) {
      return '';
    }
    return errors['required'] ? 'Email is required' : 'Email has not a vaild structure'; 
  }

  isPasswordInvalid() {
    console.log(this.loginForm.get('password')?.errors);
    return this.loginForm.get('password')?.touched && this.loginForm.get('password')?.invalid;
  }

  onSubmit() {
    // if form is invalid, console log error.
    console.log('form: ', this.loginForm);
    const userEmail = this.loginForm.value.email;
    const userPassword = this.loginForm.value.password;
    console.log(userEmail, userPassword);
  }
}
