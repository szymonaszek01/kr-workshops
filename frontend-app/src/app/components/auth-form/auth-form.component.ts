import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { passwordValidator } from '../../validators/auth.validators';
import { AuthService } from '../../services/auth.service';
import { PasswordErrorMessagePipe } from '../../pipes/password-error.pipe';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, PasswordErrorMessagePipe],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  constructor(private authService: AuthService) {}
  private readonly passwordPattern: string =
    '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$';

  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ],
    }),
  });
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isUsernameInvalid(): boolean | undefined {
    return (
      this.loginForm.get('username')?.invalid &&
      this.loginForm.get('username')?.touched
    );
  }

  getUsernameErrorMessage(): string {
    const errors = this.loginForm.get('username')?.errors;
    if (!errors) {
      return '';
    }
    return 'Username is required';
  }

  isPasswordInvalid(): boolean | undefined {
    return (
      this.loginForm.get('password')?.invalid &&
      this.loginForm.get('password')?.touched
    );
  }

  // getPasswordErrorMessage(): string {
  //   const errors = this.loginForm.get('password')?.errors;
  //   const passwordRequiredError =
  //     this.loginForm.get('password')?.errors?.['required'];

  //   if (!errors) {
  //     return '';
  //   }

  //   if (passwordRequiredError) {
  //     return 'Password is required';
  //   }

  //   return errors['passwordInvalid']
  //     ? 'The password must contain at least one uppercase letter, one lowercase letter, one number, one special character (ex. @, #, $) and be at least 8 characters long.'
  //     : '';
  // }

  onSubmit() {
    const userName: string | null | undefined = this.loginForm.value.username;
    const userPassword: string | null | undefined =
      this.loginForm.value.password;

    if (userName && userPassword && this.loginForm.valid) {
      this.authService
        .login({ username: userName, password: userPassword })
        .subscribe(() => {
          console.log('Form has been sent');
        });
    }
  }
}
