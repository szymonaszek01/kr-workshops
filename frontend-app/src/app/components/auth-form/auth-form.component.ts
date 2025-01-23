import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { passwordValidator } from '../../validators/auth.validators';

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
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, passwordValidator],
    }),
  });
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isEmailInvalid(): boolean | undefined {
    return (
      this.loginForm.get('email')?.invalid &&
      this.loginForm.get('email')?.touched
    );
  }

  getEmailErrorMessage(): string {
    const errors = this.loginForm.get('email')?.errors;
    if (!errors) {
      return '';
    }
    return errors['required']
      ? 'Email is required'
      : 'Email has not a vaild structure';
  }

  isPasswordInvalid(): boolean | undefined {
    return (
      this.loginForm.get('password')?.invalid &&
      this.loginForm.get('password')?.touched
    );
  }

  getPasswordErrorMessage(): string {
    const errors = this.loginForm.get('password')?.errors;
    const passwordRequiredError =
      this.loginForm.get('password')?.errors?.['required'];

    if (!errors) {
      return '';
    }

    if (passwordRequiredError) {
      return 'Password is required';
    }

    return errors['passwordInvalid']
      ? 'The password must contain at least one uppercase letter, one lowercase letter, one number, one special character (ex. @, #, $) and be at least 8 characters long.'
      : '';
  }

  onSubmit() {
    const userEmail = this.loginForm.value.email;
    const userPassword = this.loginForm.value.password;
  }
}
