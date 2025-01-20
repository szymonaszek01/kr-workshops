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
      validators: [Validators.required, this.passwordValidator()],
    }),
  });

  get password() {
    return this.loginForm.get('password');
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;

      // RegEx dla wymagań hasła:
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      // Sprawdzanie hasła z wykorzystaniem RegEx
      const valid = passwordRegex.test(password);

      return valid ? null : { passwordInvalid: true };
    };
  }

  isEmailInvalid(): boolean | undefined {
    console.log(this.loginForm.get('email')?.errors);
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
    console.log(this.loginForm.get('password')?.errors);
    return (
      this.loginForm.get('password')?.invalid &&
      this.loginForm.get('password')?.touched
    );
  }

  getPasswordErrorMessage(): string {
    const errors = this.loginForm.get('password')?.errors?.['passwordInvalid'];
    const passwordRequiredError =
      this.loginForm.get('password')?.errors?.['required'];

    if (!errors) {
      return '';
    }

    if (passwordRequiredError) {
      return 'Password is required';
    }

    return errors['passwordInvalid']
      ? ''
      : 'The password must contain at least one uppercase letter, one lowercase letter, one number, one special character and be at least 8 characters long.';
  }

  // getPasswordErrorMessage(): string {
  //   const errors = this.loginForm.get('password')?.errors;
  //   if (!errors) {
  //     return '';
  //   }
  //   return errors['required']
  //     ? 'Password is required'
  //     : 'Password has not a vaild structure';
  // }

  onSubmit() {
    // if form is invalid, console log error.
    if (this.loginForm.valid) console.log('Congrats - valid form');
    if (!this.loginForm.valid) {
      console.error('Sorry :( Invalid form. Try again.');
      this.getPasswordErrorMessage();
    }

    console.log('form: ', this.loginForm);
    const userEmail = this.loginForm.value.email;
    const userPassword = this.loginForm.value.password;
    console.log(userEmail, userPassword);
  }
}
